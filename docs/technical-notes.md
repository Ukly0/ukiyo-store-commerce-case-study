# Architecture and local setup

## What the repository contains

The static case study, browser captures, a capture manifest and the scripts used to record and check the presentation. It does **not** contain the WordPress backup, SQL database, credentials, original Angular source, Firebase export or raw product-media library.

The visual gallery uses the updated local WordPress storefront and the 74-product Angular catalogue. The interactive sample edition uses six shirts; sections labelled **sample edition** describe that separate setup.

## WordPress storefront

### Stack

- WordPress 6.6.2, PHP 8.2 and MariaDB 11 in Docker.
- WooCommerce 8.0.1, Astra 4.0.1, Elementor 3.15.3 and PRO Elements 3.14.0.
- The local instance is based on the project's August 2023 full-site archive.

### Local environment

1. Import the site into a private, non-versioned directory. Do not reuse the archive's `wp-config.php` or provider credentials.
2. Import the catalogue and design tables only. Exclude historical users, comments, customer lookup, orders, payment tokens, submissions, analytics and marketing data.
3. Remove non-public content and orphaned metadata; clear users and comments.
4. Use fresh local database credentials. Set local `WP_HOME` and `WP_SITEURL`, disable cron, outbound HTTP and mail, and disable live payment and marketing integrations.
5. Run the container on an internal Docker network. In the Docker version used here, internal networks do not publish ports; a loopback-only host relay provides access without container egress.
6. Verify that no original users, comments or orders remain before browsing.

### Catalogue and cart

The gallery uses the updated 74-product catalogue with uniform cards, shorter titles and WooCommerce variations. The capture workflow below uses the six-shirt sample edition; it selects a product, chooses size and colour, submits the real product form, waits for confirmation and opens the resulting guest cart. No checkout is submitted.

Storefront media dates and archive presence do not establish sales or current operation.

## Angular storefront

### Stack

- Angular 14.2, TypeScript 4.7, RxJS 7.5, Angular Material/CDK 13 and Tailwind 3.4.
- Firebase 9.9 and AngularFire 7.4 for authentication and Realtime Database.
- Express 4.18, Stripe 10.17 and Nodemailer 6.9 for the checkout service.

### Features

- Catalogue and product detail.
- Live search, category and theme filters.
- Product variants and cart.
- Wishlist and customer authentication.
- Admin product, order and customer routes with auth/admin guards.
- Checkout return and email service in the source.

### Local environment

- Install dependencies with scripts disabled and legacy peer dependency resolution.
- Run the Angular development build. The build emits legacy CSS-import, autoprefixer and CommonJS warnings; this is not a claim of a clean production dependency audit or a historical test-suite pass.
- Add local environment values and AngularFire `USE_EMULATOR` providers.
- The gallery uses the local 74-product catalogue and product imagery.
- The sample edition uses the project's six shirts for the catalogue and landing animation.
- Do not include production environment files, server credentials or historical demo-account hints.
- The local Firebase project uses database and auth emulators bound to loopback. The original hosted dataset is not part of this repository.

The sample products, EUR prices and variants are demonstration data, not historical catalogue records or a Firebase snapshot.

### Checkout and external services

The local presentation server applies a restrictive `connect-src` Content Security Policy allowing only local emulator connections. Browser automation allows only loopback and the public font/static-library origins required by the original UI. Stripe and the original hosted backend are not enabled. A payment button in the UI does not mean checkout was tested.

## Sample edition catalogue

The gallery uses the updated 74-product local catalogue. The interactive sample edition uses the six shirts that already existed in the project:

| Sample | Artwork |
| --- | --- |
| The Great Wave | Katsushika Hokusai, *The Great Wave off Kanagawa*, 1831 |
| Red Fuji | Katsushika Hokusai, *Fine Wind, Clear Morning*, c. 1831 |
| Sudden Shower | Utagawa Hiroshige, *Sudden Shower over Shin-Ohashi Bridge*, 1857 |
| Plum Garden | Utagawa Hiroshige, *Plum Garden at Kameido*, 1857 |
| Mishima Pass | Katsushika Hokusai, *Mishima Pass in Kai Province*, c. 1831 |
| Storm below the Summit | Katsushika Hokusai, *Storm below the Summit*, c. 1831 |

The printed ukiyo-e works are public-domain material sourced through Wikimedia Commons. The shirt base is the project's existing mockup. Demo sizes are S, M, L and XL; the photographed sample colour is White. Prices are explicit EUR fixtures, not historical prices or evidence of sales.

Each sample supplies one front image. The Angular template reuses that view in its two image slots rather than fabricating a second photograph.

## Sample edition capture workflow

Requirements: a local WordPress instance at `http://127.0.0.1:18780`, the Angular build at `http://127.0.0.1:18781`, Firebase emulators and the six-shirt sample catalogue.

```sh
npm install
npx playwright install chromium
npm run capture
python scripts/optimize-captures.py
```

Pillow is required for WebP derivatives. `WORDPRESS_URL`, `ANGULAR_URL` and `CHROMIUM_PATH` can override local defaults. Do not point the capture script at a production shop: it adds a guest-cart item.

`scripts/capture.mjs` records browser PNGs and the successful/failed interaction assertions. WebP derivatives preserve dimensions; they are not composited, redacted or reconstructed. The homepage video is paused for a still; other animations may be captured at a particular frame.

The workflow checks catalogue rendering, variation selection, add-to-cart confirmation, guest cart persistence, live search and Angular cart persistence. Mobile captures use a 390 × 844 viewport. It does not claim a full browser/device matrix or exhaustive regression coverage.

The capture manifest also retains runtime warnings. The WordPress mobile marquee can emit `Invalid count value: Infinity` during its geometry calculation. The selected catalogue, variant and cart checks pass independently; the warning is not edited out of the report.

`npm run record` records the Angular search-to-cart journey continuously. It requires FFmpeg, transcodes and scales the browser recording without cuts or composited controls, and writes a timestamped event manifest in `docs/video/manifest.json`. Playback is opt-in, has no audio and has an equivalent text walkthrough. It records no payment.

## Presentation validation

```sh
npm run preview
# In another terminal:
npm test
```

The presentation test checks image loading, chapter anchors, five widths (1440, 1024, 768, 390, 320), no horizontal page overflow, journey tabs, arrow-key navigation, image-dialog opening/Escape/focus return and a JavaScript-disabled reading fallback. This tests the case-study website, not accessibility conformance of the legacy shops.

## Scope and claims

- The Angular application is academic and was not verified in production.
- The WordPress stage is a configured storefront, not a custom CMS or checkout implementation.
- No sales, revenue, conversion, customer, traffic, live availability or completed-payment claim is made.
- The Shopify stage is not implemented; no theme export or interface capture is included.
- The interface captures document the local sample edition, not the store's original photography or a production deployment.

## Rights and attribution

Only screenshots of the interface are used for editorial documentation. Artwork, fashion photography and platform marks visible in those screenshots remain third-party material; no standalone originals or reuse licence are supplied. WordPress, WooCommerce, Astra, Elementor, Angular, Firebase and Shopify are third-party products; their development is not attributed to the author.
