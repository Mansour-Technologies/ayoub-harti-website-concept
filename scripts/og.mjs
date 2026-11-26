import { chromium } from '@playwright/test';
import { fileURLToPath } from 'node:url';
const b = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.goto(new URL('./og.html', import.meta.url).href);
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: fileURLToPath(new URL('../public/og.png', import.meta.url)) });
await b.close();
