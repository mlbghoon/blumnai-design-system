import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      constants: path.resolve(__dirname, 'src/constants'),
      components: path.resolve(__dirname, 'src/components'),
      icons: path.resolve(__dirname, 'src/icons'),
      utils: path.resolve(__dirname, 'src/utils'),
      styles: path.resolve(__dirname, 'src/styles'),
      tokens: path.resolve(__dirname, 'src/tokens'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.{ts,tsx}'],
    css: false,
  },
});
