import { expect, test } from '@playwright/test';

const publicLinks = [
  'https://t.me/Chesterf1ld',
  'https://github.com/Chest3rf1eld',
  'https://www.linkedin.com/in/nikita-chaturov-8625a5281/',
  'https://kwork.ru/user/nikchester',
  'https://unsplash.com/@nikchester',
  'https://www.youtube.com/@Chesterf1eld',
  'https://github.com/Chest3rf1eld/grafana-prometheus-loki-ansible',
  'https://github.com/Chest3rf1eld/HestiaCP_scripts',
  'https://github.com/Chest3rf1eld/pi-linux-troubleshooting',
  'https://github.com/Chest3rf1eld/my-i3-dotfiles',
  'https://github.com/Chest3rf1eld/Chest3rf1eld.github.io',
  'https://github.com/Chest3rf1eld/kwork-jobs-parser',
  'https://www.reddit.com/r/RuProgrammers/s/O6DUeSJ1W3',
];

test('renders English portfolio by default and switches to Russian', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Nikita Chaturov' })).toBeVisible();
  await expect(page.getByText('Infrastructure Engineer').first()).toBeVisible();
  await expect(page.getByText('15+')).toBeVisible();
  await expect(page.locator('#work .titlebar').getByText('Cases', { exact: true })).toBeVisible();
  await expect(page.getByText('Proverka-cheka.ru Abuse Mitigation')).toBeVisible();
  await expect(page.getByText('Download public CV.')).toBeVisible();
  await expect(page.getByText('Freelance infrastructure tasks')).toBeVisible();
  await expect(page.getByText('Linux production infrastructure')).toHaveCount(0);
  await expect(page.getByText('Infrastructure diagnostics')).toHaveCount(0);
  await expect(page.getByText('./healthcheck --contact')).toHaveCount(0);

  await expect(page.getByRole('img', { name: 'Nikita Chaturov, Infrastructure Engineer' })).toBeVisible();
  await page.getByRole('button', { name: 'RU' }).click();
  await expect(page.getByRole('heading', { name: 'Никита Чатуров' })).toBeVisible();
  await expect(page.locator('#contact').getByText('Контакты')).toBeVisible();
});

test('has required public links and CV downloads', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Show more cases' }).click();

  for (const href of publicLinks) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  }

  for (const href of ['#profile', '#proof', '#work', '#freelance', '#stack', '#cv', '#contact', '#personal']) {
    await expect(page.locator(`nav a[href="${href}"]`).first()).toBeVisible();
  }
  await expect(page.getByRole('link', { name: 'Start' })).toHaveCount(0);

  await expect(page.locator('a[href="/assets/cv/nikita-chaturov-cv.en.pdf"]')).toBeVisible();
  await expect(page.locator('a[href="/assets/cv/nikita-chaturov-cv.ru.pdf"]')).toBeVisible();
  await expect(page.locator('a[href^="mailto:nikchester01@gmail.com"]')).toBeVisible();
  await expect(page.locator('#freelance a[href="https://kwork.ru/user/nikchester"]')).toBeVisible();
  await expect(page.locator('#freelance a[href="https://t.me/Chesterf1ld"]')).toBeVisible();
  await expect(page.locator('a[href="/en/cases/web-cluster/"]')).toBeVisible();
  await expect(page.locator('a[href="/en/cases/proverka-cheka/"]')).toBeVisible();
});

test('does not render duplicated repo field or contact prompt badge', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('.manifest-body dt').filter({ hasText: /^repo:$/ })).toHaveCount(0);
  await expect(page.locator('.manifest-head code').filter({ hasText: /status:/ })).toHaveCount(0);
  await expect(page.getByText('Repository file')).toHaveCount(0);
  await expect(page.locator('#contact .dialog-badge')).toHaveCount(0);
  await expect(page.locator('.project-titlebar .file-icon').first()).toHaveText('>');
});

test('renders personal section and ANSI portrait interaction', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#personal').getByText('Photography lives on Unsplash')).toBeVisible();
  await expect(page.locator('#personal a[href="https://unsplash.com/@nikchester"]')).toBeVisible();
  await expect(page.locator('#personal a[href="https://www.youtube.com/@Chesterf1eld"]')).toBeVisible();
  await expect(page.locator('#contact a[href="https://unsplash.com/@nikchester"]')).toHaveCount(0);
  await expect(page.locator('.photo-ansi')).toHaveAttribute('aria-hidden', 'true');
  await page.locator('.photo-window').click();
  await expect(page.locator('.photo-window')).toHaveClass(/show-ansi/);
});

test('uses desktop side nav and mobile toggle menu', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto('/');
  await expect(page.locator('.side-nav')).toBeVisible();
  await expect(page.locator('.side-nav-title')).toHaveText('Sections');
  await expect(page.locator('.hero .menu-bar')).toHaveCount(0);

  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto('/');
  await expect(page.locator('.side-nav')).toBeHidden();
  await page.getByRole('button', { name: 'Sections' }).click();
  await expect(page.locator('.mobile-nav-links a[href="#personal"]')).toBeVisible();
});

for (const viewport of [
  { width: 1536, height: 864 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
  { width: 3440, height: 1440 },
]) {
  test(`keeps side nav clear and content centered at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/');

    const nav = page.locator('.side-nav').first();
    const content = page.locator('.desktop-shell').first();
    await expect(nav).toBeVisible();
    await expect(content).toBeVisible();

    const navBox = await nav.boundingBox();
    const contentBox = await content.boundingBox();

    expect(navBox).not.toBeNull();
    expect(contentBox).not.toBeNull();
    const navContentGap = contentBox!.x - (navBox!.x + navBox!.width);
    expect(navContentGap).toBeGreaterThanOrEqual(32);
    expect(navContentGap).toBeLessThanOrEqual(34);

    const contentCenter = contentBox!.x + (contentBox!.width / 2);
    expect(Math.abs(contentCenter - (viewport.width / 2))).toBeLessThanOrEqual(1);
  });
}

test('collapses and expands cases by viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto('/');
  await expect(page.locator('#work .project-card')).toHaveCount(4);
  await page.getByRole('button', { name: 'Show more cases' }).click();
  await expect(page.locator('#work .project-card')).toHaveCount(7);

  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto('/');
  await expect(page.locator('#work .project-card')).toHaveCount(2);
});

test('serves static case pages directly', async ({ page }) => {
  await page.goto('/en/cases/web-cluster/');
  await expect(page.getByRole('heading', { name: 'Web Cluster Operations' })).toBeVisible();
  await expect(page.getByText('request path')).toBeVisible();

  await page.goto('/ru/cases/proverka-cheka/');
  await expect(page.getByRole('heading', { name: 'Proverka-cheka.ru Abuse Mitigation' })).toBeVisible();
  await expect(page.getByText('Сдерживание построено')).toBeVisible();
});

test('applies Russian typography transform without breaking links', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'RU' }).click();

  const heroHtml = await page.locator('#profile .html-block').innerHTML();
  expect(heroHtml).toContain('и&nbsp;');
  await expect(page.locator('a[href="https://www.youtube.com/@Chesterf1eld"]')).toBeVisible();
});

for (const width of [360, 768, 1366, 1920]) {
  test(`does not overflow horizontally at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(hasOverflow).toBe(false);
  });
}
