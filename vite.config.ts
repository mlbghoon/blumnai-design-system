import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
            entry: path.resolve(__dirname, 'src/index.ts'),
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
