import { chromium, expect } from 'playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('docs/images/runtime');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const allowed = new Set(['127.0.0.1', 'localhost', 'fonts.googleapis.com', 'fonts.gstatic.com',
  'cdnjs.cloudflare.com', 'cdn.jsdelivr.net', 'code.jquery.com']);
const blocked = new Set();
await context.route('**/*', route => {
  const u = new URL(route.request().url());
  if (allowed.has(u.hostname) || ['data:', 'blob:'].includes(u.protocol)) return route.continue();
  blocked.add(u.hostname);
  return route.abort();
});
const tests = [];
const captures = [];
const wp = process.env.WORDPRESS_URL || 'http://127.0.0.1:18780';
const angular = process.env.ANGULAR_URL || 'http://127.0.0.1:18781';
const page = await context.newPage();
const pageErrors = [];
page.on('pageerror', e => pageErrors.push({ route: new URL(page.url()).pathname, message: e.message }));

async function visit(url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
}
async function capture(name, note, { fullPage = false } = {}) {
  await page.screenshot({ path: path.join(output, `${name}.png`), fullPage });
  captures.push({ file: `images/runtime/${name}.png`, route: new URL(page.url()).pathname,
    viewport: page.viewportSize(), fullPage, note });
}
async function check(name, callback) {
  try { await callback(); tests.push({ name, status: 'passed' }); }
  catch (e) { tests.push({ name, status: 'failed', message: e.message.slice(0, 500) }); throw e; }
}

try {
  await visit(wp);
  await page.waitForTimeout(2200);
  await page.evaluate(() => document.querySelectorAll('video').forEach(v => v.pause()));
  await capture('wordpress-home', 'Restored WordPress homepage in the local sample-catalogue version. Original template; video paused for a still capture.');
  await visit(`${wp}/?post_type=product`);
  await check('WordPress catalogue renders the six project samples', async () => {
    expect(await page.locator('li.product').count()).toBe(6);
    await expect(page.locator('main')).toContainText('The Great Wave');
  });
  await capture('wordpress-catalogue', 'Real WooCommerce catalogue populated with the six existing ukiyo-e t-shirt samples supplied in the project. Demo products, prices and variants; not the historical product dataset.');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit(`${wp}/product/sample-ola/`);
  await page.locator('select[name="attribute_size"]').selectOption('M');
  await page.locator('select[name="attribute_color"]').selectOption('White');
  await check('WordPress variation enables add to cart', async () => {
    await expect(page.getByRole('button', { name: 'Add to cart', exact: true })).toBeEnabled();
  });
  await page.waitForTimeout(1200); // Let the template entrance and variation fade finish before the still.
  await capture('wordpress-product', 'Restored product template showing The Great Wave project sample, size M and colour White.');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle' }),
    page.getByRole('button', { name: 'Add to cart', exact: true }).click(),
  ]);
  await check('WordPress confirms add to cart', async () => {
    await expect(page.locator('.woocommerce-message')).toContainText('added to your cart');
  });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await visit(`${wp}/cart/`);
  await check('WordPress selected product persists in cart', async () => {
    await expect(page.locator('.woocommerce-cart-form')).toContainText('The Great Wave');
    await expect(page.locator('.woocommerce-cart-form')).toContainText('White');
  });
  await capture('wordpress-cart', 'Actual guest cart, populated through the product form. No order submitted.');

  await visit(angular);
  await page.waitForTimeout(1100);
  await capture('angular-home', 'Latest reviewed Angular frontend with the project sample shirts in its existing landing animation. Local Firebase; historical testimonials omitted.');
  await visit(`${angular}/home`);
  await check('Angular local catalogue renders', async () => {
    await expect(page.locator('app-product-box').first()).toBeVisible();
    await expect(page.locator('app-product-box')).toHaveCount(6);
  });
  const total = await page.locator('app-product-box').count();
  await capture('angular-catalogue', 'Latest reviewed Angular components populated with the same six project-supplied sample shirts as WordPress. This is a working sample version, not the historical Firebase dataset.');
  await page.getByPlaceholder('Search...').pressSequentially('Wave', { delay: 75 });
  await check('Angular search reduces the visible catalogue', async () => {
    await expect(page.locator('app-product-box')).toHaveCount(1);
    expect(await page.locator('app-product-box').count()).toBeLessThan(total);
  });
  await capture('angular-search', 'Live search after typing Wave isolates The Great Wave from the six-sample collection. This is an interaction, not an edited screenshot.');
  await visit(`${angular}/product/sample-ola`);
  await page.locator('select').nth(0).selectOption('M');
  await page.locator('select').nth(1).selectOption('White');
  await capture('angular-product', 'Latest reviewed product component with The Great Wave project sample. Size M and colour White are selected. The collection and prices are explicit demo data.');
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).click();
  await page.waitForTimeout(700);
  await visit(`${angular}/cart`);
  await check('Angular add to cart persists variant and total', async () => {
    await expect(page.locator('app-cart')).toContainText('The Great Wave');
    await expect(page.locator('app-cart')).toContainText('24.99');
    const cartId = await page.evaluate(() => localStorage.getItem('cartId'));
    expect(cartId).toBeTruthy();
    const response = await context.request.get(`http://127.0.0.1:19000/shopping-cart/${cartId}.json?ns=demo-ukiyo-default-rtdb`);
    expect(response.ok()).toBe(true);
    const state = await response.json();
    const item = Object.values(state.items)[0];
    expect(item.quantity).toBe(1);
    expect(item.product).toMatchObject({ productKey: 'sample-ola', selectedSize: 'M', selectedColor: 'White' });
  });
  await capture('angular-cart', 'Cart filled through the real product action and persisted in the local Firebase database. Payment requests are blocked.');

  await page.setViewportSize({ width: 390, height: 844 });
  await visit(`${angular}/home`);
  await page.locator('.toggle-filters-button').click();
  await capture('angular-mobile-filters', 'Original mobile filter overlay, opened through its filter button.');
  await visit(`${angular}/product/sample-ola`);
  await capture('angular-mobile-product', 'Original mobile product layout and bottom Add to Cart action.');
  await visit(wp);
  await page.waitForTimeout(1200);
  await capture('wordpress-mobile-home', 'Original WordPress homepage at a 390px viewport.');
} finally {
  await writeFile('docs/capture-manifest.json', JSON.stringify({
    capturedAt: new Date().toISOString(), type: 'local-runtime-project-sample-version',
    privacy: 'No historical users, reviews, customer orders or credentials in captures.',
    scope: 'Restored WordPress and latest reviewed Angular frontend running the same six existing project t-shirt samples. Sample data and EUR prices; not historical catalogue records. Shopify not recovered.',
    sourceRevision: '40f7f820e876c3c1a16b336950f78941ecb131db',
    catalogue: 'sample-collection.json',
    blockedExternalHosts: [...blocked], tests, pageErrors, captures,
  }, null, 2) + '\n');
  await browser.close();
}
