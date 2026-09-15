import { expect, test } from '@playwright/test';

const publicLinks = [
  'https://t.me/Chesterf1ld',
  'https://github.com/Chest3rf1eld',
  'https://www.linkedin.com/in/nikita-chaturov-8625a5281/',
  'https://github.com/Chest3rf1eld/grafana-prometheus-loki-ansible',
  'https://github.com/Chest3rf1eld/HestiaCP_scripts',
  'https://github.com/Chest3rf1eld/pi-linux-troubleshooting',
  'https://github.com/Chest3rf1eld/my-i3-dotfiles',
];

test('renders English portfolio by default and switches to Russian', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Nikita Chaturov' })).toBeVisible();
  await expect(page.getByText('Infrastructure Engineer').first()).toBeVisible();
  await expect(page.getByText('15+')).toBeVisible();
  await expect(page.locator('#work').getByText('Selected work')).toBeVisible();
  await expect(page.getByText('Monitoring Stack as Code')).toBeVisible();
  await expect(page.getByText('Public CV without phone number.')).toBeVisible();

  await expect(page.getByRole('img', { name: 'Nikita Chaturov, Infrastructure Engineer' })).toBeVisible();
  await page.getByRole('button', { name: 'RU' }).click();
  await expect(page.getByRole('heading', { name: 'Никита Чатуров' })).toBeVisible();
  await expect(page.locator('#contact').getByText('Контакты')).toBeVisible();
});

test('has required public links and CV downloads', async ({ page }) => {
  await page.goto('/');

  for (const href of publicLinks) {
    await expect(page.locator(`a[href="${href}"]`).first()).toBeVisible();
  }

  for (const href of ['#profile', '#proof', '#work', '#stack', '#cv', '#contact']) {
    await expect(page.locator(`nav a[href="${href}"]`).first()).toBeVisible();
  }

  await expect(page.locator('a[href="/assets/cv/nikita-chaturov-cv.en.pdf"]')).toBeVisible();
  await expect(page.locator('a[href="/assets/cv/nikita-chaturov-cv.ru.pdf"]')).toBeVisible();
  await expect(page.locator('a[href^="mailto:nikchester01@gmail.com"]')).toBeVisible();
});

for (const width of [360, 768, 1366, 1920]) {
  test(`does not overflow horizontally at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(hasOverflow).toBe(false);
  });
}
