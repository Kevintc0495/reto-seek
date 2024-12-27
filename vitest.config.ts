import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/App.tsx',
        'src/main.tsx',
        'src/pages/**/schemas/**/*',
        'src/pages/dashboard/**/*',
        'src/pages/welcome/**/*',
        'src/pages/task/pages/**/*',
        'src/interface/**/*',
        'src/services/api/**/*',
        'src/util/**/*',
        'src/routes/**/*',
        '**/*.js',
        '**/*.test.*',
        '**/*.config.*',
        '**/index.ts',
      ],
    },
  },
});
