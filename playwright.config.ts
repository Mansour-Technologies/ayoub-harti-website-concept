import { defineConfig, devices } from '@playwright/test';

const live = !!process.env.BASE_URL;
const baseURL = process.env.BASE_URL ?? 'http://localhost:4321/ayoub-harti-website-concept/';
const launchOptions = process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {};

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  workers: live ? 3 : undefined,
  retries: live ? 1 : 0,
  reporter: [['list']],
  use: { baseURL, launchOptions, trace: 'off' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 }, launchOptions } },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 375, height: 812 }, launchOptions }, grep: /@mobile/ },
  ],
  webServer: live ? undefined : { command: 'npx astro preview --port 4321', url: baseURL, reuseExistingServer: true, timeout: 60_000 },
});
