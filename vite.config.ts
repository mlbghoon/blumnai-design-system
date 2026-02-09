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
            external: [
              'react',
              'react-dom',
              'react/jsx-runtime',
              'react-hook-form',
              'zod',
              '@hookform/resolvers',
              '@hookform/resolvers/zod',
            ],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                'react/jsx-runtime': 'jsxRuntime',
              },
              assetFileNames: (assetInfo) => {
                if (assetInfo.name === 'style.css') return 'styles.css'
                return assetInfo.name || 'assets/[name][extname]'
              },
            },
          },
          sourcemap: true,
          cssCodeSplit: false,
          minify: 'esbuild',
        }
      : {},
  }
})
