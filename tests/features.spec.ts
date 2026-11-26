import { test, expect } from '@playwright/test';

test.describe('Cours', () => {
  test('filter by level, domain and search; URL param; empty state', async ({ page }) => {
    await page.goto('cours/');
    const visible = page.locator('.chap__item:not([hidden])');
    await expect(visible).toHaveCount(33);
    await page.locator('[data-filter="level"] button', { hasText: '2ème Bac' }).click();
    await expect(visible).toHaveCount(14);
    await expect(page).toHaveURL(/niveau=2bac/);
    await page.locator('[data-filter="domain"] button', { hasText: 'Chimie' }).click();
    await expect(visible).toHaveCount(4);
    for (const lv of await visible.evaluateAll((els) => els.map((e) => (e as HTMLElement).dataset.level))) expect(lv).toBe('2bac');
    await page.locator('[data-filter="domain"] button', { hasText: 'Tout' }).click();
    await page.getByLabel('Rechercher un chapitre').fill('dipôle');
    await expect(visible).toHaveCount(2);
    await page.getByLabel('Rechercher un chapitre').fill('zzzz');
    await expect(page.locator('[data-empty]')).toBeVisible();
    await page.getByRole('button', { name: 'Réinitialiser les filtres' }).click();
    await expect(visible).toHaveCount(33);
  });

  test('deep link ?niveau=tc preselects level @mobile', async ({ page }) => {
    await page.goto('cours/?niveau=tc');
    await expect(page.locator('.chap__item:not([hidden])')).toHaveCount(6);
    await expect(page.locator('[data-filter="level"] button[aria-pressed="true"]')).toHaveText('Tronc commun');
  });

  test('“studied” progress persists and reaches the dashboard', async ({ page }) => {
    await page.goto('cours/');
    await page.locator('[data-study="2bac-rc"]').click();
    await expect(page.locator('[data-study="2bac-rc"]')).toHaveAttribute('aria-pressed', 'true');
    await page.reload();
    await expect(page.locator('[data-study="2bac-rc"]')).toHaveAttribute('aria-pressed', 'true');
    await page.goto('espace-etudiant/');
    await expect(page.locator('[data-k-courses]')).toHaveText('1/33');
  });
});

test.describe('Vidéothèque', () => {
  test('featured official video uses click-to-load youtube-nocookie facade', async ({ page }) => {
    await page.goto('videotheque/');
    await expect(page.locator('[data-stage] iframe')).toHaveCount(0);
    await page.locator('[data-stage] .yt__btn').click();
    await expect(page.locator('[data-stage] iframe')).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/bQRpHAGhIXw/);
  });

  test('search and level filter', async ({ page }) => {
    await page.goto('videotheque/');
    const cards = page.locator('.card:not([hidden])');
    await expect(cards).toHaveCount(15);
    await page.getByLabel('Rechercher une leçon').fill('demi-vie');
    await expect(cards).toHaveCount(1);
    await page.getByLabel('Rechercher une leçon').fill('');
    await page.locator('[data-lv] button', { hasText: '1ère Bac' }).click();
    await expect(cards).toHaveCount(3); // 2 lessons + the all-levels official video
  });

  test('bookmarks, progress, history and continue-watching persist across reloads @mobile', async ({ page }) => {
    await page.goto('videotheque/');
    await page.locator('[data-fav="v-rc"]').click();
    await expect(page.locator('[data-fav="v-rc"]')).toHaveAttribute('aria-pressed', 'true');
    await page.locator('[data-play="v-radio"]').click();
    await expect(page.locator('[data-st-title]')).toHaveText(/Demi-vie/);
    await page.locator('[data-next]').click();
    await expect(page.locator('.st__prog')).toHaveAttribute('aria-valuenow', '33');
    await page.reload();
    await expect(page.locator('[data-fav="v-rc"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-st-title]')).toHaveText(/Demi-vie/); // ?v= deep link kept
    await expect(page.locator('.st__prog')).toHaveAttribute('aria-valuenow', '33');
    await expect(page.locator('[data-resume]')).toContainText('Demi-vie');
    await expect(page.locator('[data-history]')).toContainText('Demi-vie');
    await page.locator('[data-favonly]').click();
    await expect(page.locator('.card:not([hidden])')).toHaveCount(1);
    await page.goto('espace-etudiant/');
    await expect(page.locator('[data-bookmarks]')).toContainText('Dipôle RC');
    await expect(page.locator('[data-next-title]')).toHaveText(/Demi-vie/);
  });
});

test.describe('Préparation aux examens', () => {
  test('quiz scoring: correct answer, summary, saved result', async ({ page }) => {
    await page.goto('examens/');
    for (const t of ['nucleaire', 'electricite', 'mecanique', 'chimie']) await page.locator(`input[name="theme"][value="${t}"]`).uncheck();
    await page.locator('[data-diff] button', { hasText: 'Facile' }).click();
    await expect(page.locator('[data-avail]')).toContainText('1 question');
    await page.locator('[data-start]').click();
    await expect(page.locator('[data-legend]')).toContainText('λ = 0,50 m');
    await page.locator('.opt', { hasText: '10 m/s' }).click();
    await page.locator('[data-check]').click();
    await expect(page.locator('[data-fb]')).toContainText('Bonne réponse');
    await expect(page.locator('[data-fb]')).toContainText('v = λ · f');
    await page.locator('[data-next]').click();
    await expect(page.locator('[data-sum-score]')).toHaveText('1/1');
    await expect(page.locator('[data-results]')).toContainText('1/1');
    await page.reload();
    await expect(page.locator('[data-results]')).toContainText('Ondes');
  });

  test('quiz wrong answer and reset @mobile', async ({ page }) => {
    await page.goto('examens/');
    await page.locator('[data-start]').click();
    await expect(page.locator('[data-pos]')).toHaveText('Question 1 / 8');
    await page.locator('[data-check]').click();
    await expect(page.locator('[data-fb]')).toContainText('Choisis une réponse');
    // pick a wrong option: find index != correct by reading the explanation after
    await page.locator('.opt').first().click();
    await page.locator('[data-check]').click();
    await expect(page.locator('.opt.right')).toHaveCount(1);
    const score = await page.locator('[data-score]').textContent();
    expect(score).toMatch(/Score : [01]/);
    await page.locator('[data-run] [data-reset]').click();
    await expect(page.locator('[data-setup]')).toBeVisible();
    await expect(page.locator('[data-run]')).toBeHidden();
  });

  test('checklist progress persists', async ({ page }) => {
    await page.goto('examens/');
    await page.locator('[data-cl="ondes:0"]').check();
    await page.locator('[data-cl="ondes:1"]').check();
    await expect(page.locator('[data-cl-pct="ondes"]')).toHaveText('2 / 5');
    await page.reload();
    await expect(page.locator('[data-cl="ondes:1"]')).toBeChecked();
    await page.getByRole('button', { name: 'Afficher la correction' }).first().click();
    await expect(page.locator('#ex-a-0')).toBeVisible();
  });
});

test.describe('Laboratoire', () => {
  test('inputs change results with correct physics', async ({ page }) => {
    await page.goto('laboratoire/');
    await expect(page.locator('[data-res-R]')).toHaveText('40,77 m');
    await expect(page.locator('[data-res-T]')).toHaveText('2,88 s');
    await expect(page.locator('[data-res-H]')).toHaveText('10,19 m');
    await page.locator('[data-v0]').fill('30');
    await page.locator('[data-ang]').fill('30');
    // R = 900·sin60/9.81 = 79.45 ; T = 60·0.5/9.81 = 3.06 ; H = 900·0.25/19.62 = 11.47
    await expect(page.locator('[data-res-R]')).toHaveText('79,45 m');
    await expect(page.locator('[data-res-T]')).toHaveText('3,06 s');
    await expect(page.locator('[data-res-H]')).toHaveText('11,47 m');
    await expect(page.locator('[data-vx]')).toHaveText('25,98 m/s');
    await page.locator('[data-g] button', { hasText: 'Lune' }).click();
    await expect(page.locator('[data-res-R]')).toHaveText('481,13 m');
  });

  test('play, pause and reset @mobile', async ({ page }) => {
    await page.goto('laboratoire/');
    const lab = page.locator('[data-lab]');
    await page.locator('[data-play]').click();
    await expect(page.locator('[data-play]')).toHaveAttribute('aria-pressed', 'true');
    await page.waitForTimeout(600);
    await page.locator('[data-play]').click();
    await expect(page.locator('[data-play]')).toHaveAttribute('aria-pressed', 'false');
    const t1 = Number(await lab.getAttribute('data-t'));
    expect(t1).toBeGreaterThan(0.2);
    await page.waitForTimeout(400);
    expect(Number(await lab.getAttribute('data-t'))).toBe(t1); // paused
    // v_y decreased from v0 sin α
    const vy = parseFloat((await page.locator('[data-vy]').textContent())!.replace(',', '.'));
    expect(vy).toBeLessThan(14.14);
    await page.locator('[data-v0]').fill('35');
    await page.locator('[data-reset]').click();
    await expect(lab).toHaveAttribute('data-t', '0.000');
    await expect(page.locator('[data-v0]')).toHaveValue('20');
    await expect(page.locator('[data-res-R]')).toHaveText('40,77 m');
  });

  test('runs to impact and reports landing', async ({ page }) => {
    await page.goto('laboratoire/');
    await page.locator('[data-v0]').fill('8');
    await page.locator('[data-play]').click();
    await expect(page.locator('[data-play-label]')).toHaveText('▶ Relancer', { timeout: 5000 });
    await expect(page.locator('#live-region')).toContainText('Impact');
  });
});

test.describe('Espace étudiant & contact', () => {
  test('goals persist and reset clears everything', async ({ page }) => {
    await page.goto('espace-etudiant/');
    await page.locator('[data-goal="g1"]').check();
    await expect(page.locator('[data-goals-count]')).toHaveText('1/4 objectifs atteints');
    await page.reload();
    await expect(page.locator('[data-goal="g1"]')).toBeChecked();
    await page.getByRole('button', { name: 'Réinitialiser la démo' }).click();
    await page.getByRole('button', { name: 'Oui, tout effacer' }).click();
    await expect(page.locator('[data-goal="g1"]')).not.toBeChecked();
    expect(await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('harti-demo:')).length)).toBe(0);
  });

  test('demo contact form validates and sends nothing @mobile', async ({ page }) => {
    const posts: string[] = [];
    page.on('request', (r) => { if (r.method() !== 'GET') posts.push(r.url()); });
    await page.goto('contact/');
    await page.getByRole('button', { name: /Tester l’envoi/ }).click();
    await expect(page.locator('[data-err]')).toContainText('Niveau');
    await page.getByLabel('Niveau').selectOption('2bac');
    await page.getByLabel('Sujet').selectOption({ index: 1 });
    await page.getByLabel('Message').fill('Question sur le dipôle RC, merci.');
    await page.getByRole('button', { name: /Tester l’envoi/ }).click();
    await expect(page.locator('[data-ok]')).toContainText('rien n’a été envoyé');
    expect(posts).toEqual([]);
  });
});

test('home teaser question gives instant feedback @mobile', async ({ page }) => {
  await page.goto('');
  await page.locator('[data-mini-q] label', { hasText: '45°' }).click();
  await expect(page.locator('[data-mini-q] [data-out]')).toHaveText('Bonne réponse ✓');
  await expect(page.locator('[data-mini-q] [data-why]')).toBeVisible();
});
