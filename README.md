# Ukiyo Store — commerce case study

A visual case study of an apparel storefront built in two stages: a WordPress/WooCommerce shop and a custom Angular frontend for the same 74-product catalogue.

The study covers discovery, search and filters, product variants, cart and responsive behaviour, using the store's existing catalogue and product imagery.

![Ukiyo Store cover](docs/images/ukiyo-store-cover.png)

## Visual gallery

### WordPress + WooCommerce

![WordPress homepage](docs/images/wordpress-responsive-hero.png)

*Desktop and mobile composition of the homepage: original Astra/Elementor layout, “BE JAPAN” hero, navigation and product sections.*

![WordPress catalogue](docs/images/store-wordpress.png)

*Catalogue with uniform product cards, shorter titles and WooCommerce variations.*

| Categories | Collection |
| --- | --- |
| ![Category navigation](docs/images/wordpress-responsive-categorias.png) | ![Collection section](docs/images/wordpress-responsive-coleccion.png) |

| Products | Brand |
| --- | --- |
| ![Product section](docs/images/wordpress-responsive-productos.png) | ![Brand section](docs/images/wordpress-responsive-marca.png) |

### Angular + Firebase / Express

![Angular catalogue](docs/images/store-angular-catalog.png)

*Catalogue with 74 products, live search, category and theme filters, and product cards.*

![Angular product](docs/images/store-angular-product.png)

*Product page with size and colour selection, price and Add to Cart.*

## What it covers

### WordPress + WooCommerce

Brand-led merchandising with Astra and Elementor, a refined 74-product catalogue, product variations and a guest cart handled by WooCommerce.

### Angular + Firebase / Express

A custom storefront with live search, category and theme filters, product variants, a Firebase-backed cart, authentication and admin routes, and an Express checkout service. The local edition reads the catalogue and product media locally; the hosted Firebase catalogue is not part of this repository.

### Responsive behaviour

Desktop and mobile compositions for the WordPress homepage, catalogue, categories, collection, products and brand sections. The mobile catalogue exposes the original horizontal clipping; it is not a WCAG conformance claim.

### Shopify

The presentation records Shopify as outside the scope of this case study. No implementation, theme export or interface capture is included, so no substitute UI or dates are shown.

## Stack

| Layer | Technology |
| --- | --- |
| WordPress storefront | WordPress 6.6.2, WooCommerce 8.0.1, Astra 4.0.1, Elementor 3.15.3, PHP 8.2, MariaDB 11 |
| Angular frontend | Angular 14.2, TypeScript 4.7, RxJS 7.5, Angular Material/CDK 13, Tailwind 3.4 |
| Application services | Firebase 9.9, AngularFire 7.4, Express 4.18, Stripe 10.17, Nodemailer 6.9 |
| Presentation | Static HTML, CSS and JavaScript; Playwright for captures |

## Interactive sample edition

The repository also includes [`docs/index.html`](docs/index.html), a separate six-shirt sample edition that documents the complete search → variant → cart journey with fresh captures, a video walkthrough and responsive states. It is not the 74-product catalogue shown in the gallery above.

```sh
npm install
npm run preview
```

Open **http://127.0.0.1:18782**. The presentation is static; it does not need a frontend build or external APIs.

## Repository layout

- `docs/images/` — updated WordPress and Angular gallery assets.
- `docs/images/runtime/` — captures for the six-shirt sample edition.
- `docs/index.html` — the interactive sample edition.
- `docs/capture-manifest.json` — capture metadata, viewports and interaction checks.
- `docs/technical-notes.md` — local setup, architecture and capture details.
- `docs/samples.md` — six-shirt sample edition catalogue.
- `scripts/` — capture, recording and presentation checks.
- `package.json` — preview, capture, record and test commands.

## Run the presentation tests

```sh
npm test
```

The check covers image loading, chapter anchors, five viewport widths, horizontal overflow, journey tabs, keyboard navigation, the image dialog and the JavaScript-disabled fallback. It tests the sample edition, not the legacy shops.

## Capture the applications

The capture scripts expect local WordPress and Angular instances on loopback, Firebase emulators and the six-shirt sample catalogue. See [`docs/technical-notes.md`](docs/technical-notes.md) for the full setup.

```sh
npx playwright install chromium
npm run capture
python scripts/optimize-captures.py
npm run record
```

Do not point the capture scripts at a production shop: they add a guest-cart item.

## Data and scope

- The gallery uses the updated local WordPress storefront and the 74-product Angular catalogue with the store's existing product imagery.
- The six-shirt sample edition is a separate presentation fixture; products, prices and variants there are demonstration data.
- The repository contains documentation, presentation assets and capture scripts. It does not contain the WordPress backup, database, credentials, original Angular source or Firebase export.
- No revenue, conversion, traffic, customer count, production deployment, payment or email delivery is claimed.
- WordPress, WooCommerce, Astra, Elementor, Angular, Firebase and Shopify are third-party products. Their development is not attributed to the author.
- Product artwork and platform marks remain their respective owners' property. No licence for reuse of the legacy application or this repository is granted.

## Documentation

- [Visual gallery](#visual-gallery)
- [Interactive sample edition](docs/index.html)
- [Architecture and local setup](docs/technical-notes.md)
- [Sample edition catalogue](docs/samples.md)
- [Capture manifest](docs/capture-manifest.json)
