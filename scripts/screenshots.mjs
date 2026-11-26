import { chromium } from '@playwright/test';
const [,, base, outDir, ...pages] = process.argv;
const b = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
for (const spec of pages) {
  const [path, w, h, full, name] = spec.split('|');
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  const errs = [];
  p.on('console', m => m.type() === 'error' && errs.push(m.text()));
  p.on('response', r => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  await p.goto(base + path, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('in')));
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${outDir}/${name}.png`, fullPage: full === '1' });
  console.log(name, errs.length ? errs : 'ok');
  await p.close();
}
await b.close();
