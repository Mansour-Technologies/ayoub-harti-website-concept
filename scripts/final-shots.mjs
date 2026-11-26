// Production screenshot set (run with BASE pointing at the live URL).
import { chromium } from '@playwright/test';
const BASE = process.env.BASE ?? 'https://mansour-technologies.github.io/ayoub-harti-website-concept/';
const OUT = process.argv[2];
const b = await chromium.launch(process.env.PW_CHROME ? { executablePath: process.env.PW_CHROME } : {});
const shot = async (name, path, w, h, full, act) => {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  const errs = [];
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  p.on('response', (r) => r.status() >= 400 && errs.push(r.status() + ' ' + r.url()));
  await p.goto(BASE + path, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.querySelectorAll('[data-reveal]').forEach((e) => e.classList.add('in')));
  if (act) await act(p);
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${OUT}/${name}.png`, fullPage: full });
  console.log(name, errs.length ? errs : 'ok');
  await p.close();
};
await shot('01-desktop-home', '', 1440, 900, false);
await shot('02-mobile-home', '', 375, 812, false);
await shot('03-desktop-home-full', '', 1440, 900, true);
await shot('04-mobile-home-full', '', 375, 812, true);
await shot('05-mobile-nav-open', '', 375, 812, false, (p) => p.click('[data-menu-open]'));
await shot('06-desktop-cours', 'cours/?niveau=2bac', 1440, 900, true);
await shot('07-desktop-videotheque-detail', 'videotheque/?v=v-rc', 1440, 900, false, async (p) => { await p.click('[data-next]'); await p.click('[data-next]'); });
await shot('08-desktop-laboratoire', 'laboratoire/', 1440, 900, false, async (p) => { await p.locator('[data-v0]').fill('24'); await p.locator('[data-ang]').fill('55'); await p.click('[data-play]'); await p.waitForTimeout(1300); await p.click('[data-play]'); await p.locator('[data-lab]').scrollIntoViewIfNeeded(); });
await shot('09-mobile-laboratoire', 'laboratoire/', 375, 812, false, async (p) => { await p.click('[data-play]'); await p.waitForTimeout(1200); await p.click('[data-play]'); await p.locator('.lab__canvas-wrap').scrollIntoViewIfNeeded(); });
await shot('10-desktop-examens-quiz', 'examens/', 1440, 900, false, async (p) => { await p.click('[data-start]'); await p.locator('.opt').nth(1).click(); await p.click('[data-check]'); });
await shot('11-desktop-espace-etudiant', 'espace-etudiant/', 1440, 900, true, async (p) => {
  await p.evaluate(() => {
    localStorage.setItem('harti-demo:courses', JSON.stringify(['2bac-rc', '2bac-ondes', '2bac-newton', '1bac-ec', 'tc-mole']));
    localStorage.setItem('harti-demo:bookmarks', JSON.stringify(['v-rc', 'v-projectile']));
    localStorage.setItem('harti-demo:progress', JSON.stringify({ 'v-rc': 67, 'v-projectile': 33 }));
    localStorage.setItem('harti-demo:history', JSON.stringify([{ id: 'v-rc', at: Date.now() }]));
    localStorage.setItem('harti-demo:quiz', JSON.stringify([{ at: Date.now() - 9e7, theme: 'ondes', score: 2, total: 3 }, { at: Date.now(), theme: 'mix', score: 6, total: 8 }]));
    localStorage.setItem('harti-demo:checklist', JSON.stringify({ 'ondes:0': true, 'ondes:1': true, 'electricite:0': true }));
    localStorage.setItem('harti-demo:goals', JSON.stringify({ g1: true }));
  });
  await p.reload({ waitUntil: 'networkidle' });
});
await shot('12-mobile-espace-etudiant', 'espace-etudiant/', 375, 812, false);
await shot('13-desktop-professeur', 'professeur/', 1440, 900, true);
await shot('14-mobile-videotheque', 'videotheque/', 375, 812, true);
await b.close();
