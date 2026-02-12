import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getLibEntries() {
  const entries: Record<string, string> = { index: path.resolve(__dirname, 'src/index.ts') }

  const componentsDir = path.resolve(__dirname, 'src/components')
  for (const dir of fs.readdirSync(componentsDir, { withFileTypes: true })) {
    if (!dir.isDirectory()) continue
    const indexFile = path.join(componentsDir, dir.name, 'index.ts')
    if (fs.existsSync(indexFile)) {
      entries[`components/${dir.name}/index`] = indexFile
    }
  }

  return entries
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === 'lib'

  return {
    plugins: [react()],
    resolve: {
      alias: {
        constants: path.resolve(__dirname, './src/constants'),
        components: path.resolve(__dirname, './src/components'),
        icons: path.resolve(__dirname, './src/icons'),
        utils: path.resolve(__dirname, './src/utils'),
        styles: path.resolve(__dirname, './src/styles'),
        tokens: path.resolve(__dirname, './src/tokens'),
        hooks: path.resolve(__dirname, './src/hooks'),
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: isLibraryBuild
      ? {
          lib: {
            entry: getLibEntries(),
            name: 'BlumnaiDesignSystem',
            formats: ['es'],
            fileName: () => `index.mjs`,
          },
          rollupOptions: {
            external: (id) => {
              if (id.startsWith('.') || path.isAbsolute(id)) return false
              const internalAliases = ['constants/', 'components/', 'icons/', 'utils/', 'styles/', 'tokens/', 'hooks/', '@/']
              if (internalAliases.some(alias => id.startsWith(alias))) return false
              return true
            },
            treeshake: {
              moduleSideEffects: false,
            },
            output: [
              {
                format: 'es',
                dir: 'dist',
                entryFileNames: '[name].mjs',
                assetFileNames: '[name][extname]',
                preserveModules: true,
                preserveModulesRoot: 'src',
              },
            ],
          },
          sourcemap: false,
          cssCodeSplit: false,
          copyPublicDir: false,
          minify: 'esbuild',
        }
      : {},
  }
})
