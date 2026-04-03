import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function getLibEntries() {
  const entries: Record<string, string> = { index: path.resolve(__dirname, 'src/index.ts') }

  const componentsDir = path.resolve(__dirname, 'src/components')

  function scanForIndex(dir: string, prefix: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const subdir = path.join(dir, entry.name)
      const indexFile = path.join(subdir, 'index.ts')
      const key = `${prefix}/${entry.name}/index`
      if (fs.existsSync(indexFile)) {
        entries[key] = indexFile
      }
      scanForIndex(subdir, `${prefix}/${entry.name}`)
    }
  }

  scanForIndex(componentsDir, 'components')

  const iconsDir = path.resolve(componentsDir, 'icons')
  if (fs.existsSync(iconsDir)) {
    for (const iconDir of fs.readdirSync(iconsDir, { withFileTypes: true })) {
      if (!iconDir.isDirectory()) continue
      const dataDir = path.join(iconsDir, iconDir.name, 'icons')
      if (!fs.existsSync(dataDir)) continue
      for (const file of fs.readdirSync(dataDir)) {
        if (file === 'index.ts') continue
        const ext = path.extname(file)
        if (ext !== '.ts' && ext !== '.tsx') continue
        const name = path.basename(file, ext)
        const key = `components/icons/${iconDir.name}/icons/${name}`
        entries[key] = path.join(dataDir, file)
      }
    }
  }

  return entries
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === 'lib'

  return {
    plugins: [
      react(),
      ...(process.env.ANALYZE ? [visualizer({
        filename: 'bundle-analysis.html',
        gzipSize: true,
        template: 'treemap',
      })] : []),
    ],
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
                sanitizeFileName: false,
              },
            ],
          },
          sourcemap: false,
          cssCodeSplit: true,
          copyPublicDir: false,
          minify: 'esbuild',
        }
      : {},
  }
})
