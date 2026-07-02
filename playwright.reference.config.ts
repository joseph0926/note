import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tools/reference-capture',
  outputDir: './test-results/reference-capture',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report/reference-capture', open: 'never' }],
  ],
  timeout: 30_000,
  retries: 0,
  workers: 1,
  use: {
    browserName: 'chromium',
    trace: 'off',
    video: 'off',
    screenshot: 'off',
  },
})
