import { chromium, expect } from 'playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';

await mkdir('test-results/video-raw', { recursive: true });
await mkdir('docs/video', { recursive: true });
const browser = await chromium.launch({ headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 },
  recordVideo: { dir: 'test-results/video-raw', size: { width: 1440, height: 1000 } },
});
await context.route('**/*', route => {
  const hostname = new URL(route.request().url()).hostname;
  return ['127.0.0.1', 'localhost', 'fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net'].includes(hostname)
    ? route.continue() : route.abort();
});
const page = await context.newPage();
const base = process.env.ANGULAR_URL || 'http://127.0.0.1:18781';
const errors = [];
page.on('pageerror', e => errors.push(e.message));
const start = Date.now();
const events = [];
function record(action) { events.push({ atSeconds: Number(((Date.now() - start) / 1000).toFixed(2)), action }); }
try {
  await page.goto(`${base}/home`, { waitUntil: 'networkidle' });
  await expect(page.locator('app-product-box').first()).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  record('Catalogue loaded');
  await page.waitForTimeout(1300);
  await page.getByPlaceholder('Search...').pressSequentially('Wave', { delay: 180 });
  await expect(page.locator('app-product-box')).toHaveCount(1);
  record('Search isolates The Great Wave project sample');
  await page.waitForTimeout(1500);
  await page.locator('app-product-box img').first().click();
  await expect(page.locator('app-product select').first()).toBeVisible();
  record('Product opened from search result');
  await page.waitForTimeout(1200);
  await page.locator('app-product select').first().selectOption('M');
  await page.locator('app-product select').nth(1).selectOption('White');
  record('Size M and colour White selected');
  await page.waitForTimeout(1500);
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.waitForTimeout(1000);
  await page.locator('button.cart').click();
  await expect(page.getByRole('link', { name: 'View Cart', exact: true })).toBeVisible();
  record('Real mini-cart opened after adding the product');
  await page.waitForTimeout(1500);
  await page.getByRole('link', { name: 'View Cart', exact: true }).click();
  await expect(page.locator('app-cart')).toContainText('The Great Wave');
  record('Cart reviewed; no payment submitted');
  await page.waitForTimeout(1800);
} finally {
  const raw = await page.video().path();
  await context.close();
  await browser.close();
  execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', raw,
    '-an', '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart', 'docs/video/angular-walkthrough.mp4']);
  await writeFile('docs/video/manifest.json', JSON.stringify({
    recordedAt: new Date().toISOString(), type: 'continuous-browser-recording',
    source: 'Latest reviewed Angular frontend running locally with the six project-supplied t-shirt samples and Firebase emulators. Explicit sample catalogue and prices, not historical Firebase records.',
    processing: 'Scaled and transcoded only. No fabricated frames, cuts or composited controls. Silent recording.',
    events, errors,
  }, null, 2) + '\n');
}
