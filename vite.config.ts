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
            formats: ['es', 'cjs'],
            fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
          },
          rollupOptions: {
            external: (id) => {
              // 상대/절대 경로가 아닌 모든 import를 external 처리 (node_modules)
              if (id.startsWith('.') || path.isAbsolute(id)) return false
              return true
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
              {
                format: 'cjs',
                dir: 'dist',
                entryFileNames: '[name].cjs',
                assetFileNames: '[name][extname]',
                exports: 'named',
                preserveModules: true,
                preserveModulesRoot: 'src',
              },
            ],
          },
          sourcemap: true,
          cssCodeSplit: false,
          copyPublicDir: false,
          minify: 'esbuild',
        }
      : {},
  }
})
