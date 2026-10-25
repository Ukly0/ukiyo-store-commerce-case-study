import { chromium, expect } from 'playwright/test';
import { mkdir, readFile } from 'node:fs/promises';

const base = process.env.CASE_STUDY_URL || 'http://127.0.0.1:18782';
await mkdir('test-results', { recursive: true });
const browser = await chromium.launch({ headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const badResponses = [];
page.on('response', response => { if (response.status() >= 400) badResponses.push(response.url()); });
try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  for (const id of ['challenge', 'stores', 'journey', 'reflection', 'evidence', 'shopify']) {
    await expect(page.locator(`#${id}`)).toHaveCount(1);
  }
  await page.getByRole('tab', { name: '02 Choose a variant' }).click();
  await expect(page.locator('#journey-angular')).toHaveAttribute('src', /angular-product.webp$/);
  await expect(page.locator('#journey-wp')).toHaveAttribute('src', /wordpress-product.webp$/);
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: '03 Review the cart' })).toBeFocused();
  await expect(page.locator('#journey-angular')).toHaveAttribute('src', /angular-cart.webp$/);
  await page.locator('#journey-angular-link').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('#dialog-image')).toHaveAttribute('src', /angular-cart.png$/);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.locator('#journey-angular-link')).toBeFocused();
  await page.getByRole('tab', { name: '01 Discover' }).click();
  const video = page.locator('video');
  await video.scrollIntoViewIfNeeded();
  await video.evaluate(element => element.load());
  await expect.poll(() => video.evaluate(element => Number.isFinite(element.duration) && element.duration > 0)).toBe(true);
  expect(await video.evaluate(element => element.autoplay)).toBe(false);
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    expect(overflow, `No horizontal page overflow at ${width}px`).toBe(false);
    for (const image of await page.locator('main img').all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true);
    }
    if (width === 1440 || width === 390) {
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `test-results/${width === 1440 ? 'desktop' : 'mobile'}.png`, fullPage: true });
    }
  }
  const withoutJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const fallback = await withoutJS.newPage();
  await fallback.goto(base);
  await expect(fallback.getByRole('heading', { name: /Beyond the/ })).toBeVisible();
  await expect(fallback.getByRole('link', { name: 'Angular cart', exact: true })).toHaveAttribute('href', /angular-cart.png$/);
  await withoutJS.close();
  const manifest = JSON.parse(await readFile('docs/capture-manifest.json', 'utf8'));
  const videoManifest = JSON.parse(await readFile('docs/video/manifest.json', 'utf8'));
  const samples = JSON.parse(await readFile('docs/sample-collection.json', 'utf8'));
  expect(samples.samples.length).toBe(6);
  expect(manifest.type).toBe('local-runtime-project-sample-version');
  expect(manifest.sourceRevision).toBe(samples.sourceRevision);
  await expect(page.locator('.sample-collection li')).toHaveCount(6);
  expect(videoManifest.errors).toEqual([]);
  expect(videoManifest.events.length).toBe(6);
  expect(manifest.tests.every(test => test.status === 'passed')).toBe(true);
  expect(manifest.captures.length).toBeGreaterThanOrEqual(12);
  expect(badResponses).toEqual([]);
  expect(errors).toEqual([]);
  console.log('PASS: desktop, 1024, 768, 390 and 320px; image loading; journey tabs; keyboard; modal; video metadata; no-JS fallback; capture/video manifests.');
} finally {
  await browser.close();
}
