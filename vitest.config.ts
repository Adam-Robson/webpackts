import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    // Same aliases as webpack: read straight from tsconfig.json `paths`.
    tsconfigPaths: true
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', '__tests__/**/*.test.{ts,tsx}']
  }
});
