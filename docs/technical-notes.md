# Technical notes

Engineering notes for the Ukiyo Store commerce case study. This document describes the observable source structure, published visual assets and a separately recorded historical local restoration. It is not a fresh runtime report.

## Source boundary

- The Angular project was reviewed read-only through source files: routes, modules, models, selected services, package files and the repository tree.
- The initial WordPress archive review inspected structure, version files, plugin directories, media inventory and log filenames without opening customer records or log content. A separate September recovery session records a full-site database import; that database is not included here.
- This update reconciles that recovery session with retained portfolio assets and freshly captures the locally adapted Angular catalogue/product pages. No production deployment or backend flow was tested. See [Recovery and improvements](recovery-and-improvements.md).

## Angular architecture

The application is a single-page Angular frontend with three service groups:

1. **Firebase client services.** Authentication and Realtime Database are accessed through AngularFire compatibility modules.
2. **Express API.** The server handles payment and email routes.
3. **External services.** Stripe Checkout creates a hosted payment session; Nodemailer sends transactional email.

Route guards separate public pages, authenticated customer pages and administrator pages. The server package declares the Firebase Admin SDK; its exact server role was not reviewed, so it is not shown as a verified request path.

## Routes

| Route | Component | Guard | Purpose |
|---|---|---|---|
| `/` | Landing | None | Landing page |
| `/home` | Home | None | Catalogue and filters |
| `/product/:key` | Product | None | Product detail |
| `/cart` | Cart | None | Cart |
| `/wishlist` | Wishlist | Auth guard | Authenticated wishlist |
| `/orders` | Orders | Auth guard | Customer order history |
| `/success`, `/success/:session_id` | Success | None | Checkout return |
| `/products-list` | Admin product list | Auth and admin guards | Admin catalogue |
| `/add-product`, `/add-product/:key` | Admin product editor | Auth and admin guards | Create or edit product |
| `/adminorders` | Admin orders | Auth and admin guards | Admin order view |

The route table is a source inspection, not a runtime test.

## Data model

| Model | Observed fields | Role |
|---|---|---|
| `Product` | key, title, price, offerPrice, categories, themes, sizes, colors, description, images | Catalogue item and variants |
| `Variant` | productKey, selectedSize, selectedColor, price, title, img | Selected configuration |
| `Cart` | Cart state consumed by orders | Cart |
| `Order` | cart, email, shipping, status, orderNumber | Order record |
| `User` | uid, email, firstName, lastName, isAdmin, cartId | Profile and role |

The model supports a catalogue, cart, checkout result and admin order view. It is not a full inventory, tax or fulfilment domain model.

## Feature implementation notes

- **Catalogue.** The product service reads a product collection and sorts image references. The product route receives a key.
- **Filters and categories.** Home components and a category service provide the browsing surface.
- **Cart.** Cart state is represented by a dedicated route, service and model.
- **Wishlist.** The wishlist route is protected by the authentication guard.
- **Authentication.** The login component and auth service use AngularFireAuth. Provider configuration was not inspected.
- **Admin.** Product list, product editor and order views are protected by authentication and administrator guards.
- **Checkout.** The success route accepts a session id; the Express server and Stripe dependency provide the payment-session side.
- **Email.** The server declares Nodemailer and contains email route files. No message was sent.
- **Tests.** Karma and Jasmine specs exist for components and services. They were not executed.

## Stack

| Package | Version | Role |
|---|---|---|
| `@angular/core` | 14.2 | SPA framework |
| `typescript` | 4.7 | Language and compiler |
| `rxjs` | 7.5 | Reactive streams |
| `@angular/material` / `@angular/cdk` | 13 | UI primitives |
| `tailwindcss` | 3.4 | Utility styling |
| `firebase` | 9.9 | Client SDK |
| `@angular/fire` | 7.4 | Angular Firebase integration |
| `express` | 4.18 | Server API |
| `stripe` | 10.17 | Checkout session API |
| `nodemailer` | 6.9 | Email transport |
| `firebase-admin` | 12 | Server dependency; exact role not reviewed |

Angular 14 and this toolchain are legacy in 2026. The versions are a historical snapshot, not a dependency-audit result.

## Historical storefront stack

| Component | Version or evidence |
|---|---|
| WordPress | 6.6.2 |
| WooCommerce | 9.2.3 |
| Theme | Astra 4.0.1 |
| Page builder | Elementor and Elementor Pro |
| Payments | WooCommerce Payments, PayPal Payments |
| Marketing and feeds | Google Listings and Ads, Pinterest, Facebook for WooCommerce, MailPoet, Woo Product Feed Pro |
| Operations | Bulk editor, size chart, image flipper, media deduper, preloader |
| Infrastructure | SiteGround Optimizer, SG Security, All-in-One WP Migration |
| Media | Product and brand files dated 2022-2024 |
| Archive | Full-site archive dated 2023-08-28 |

The archive is a historical storefront record. It does not establish sales, revenue, customer counts or current operation.

## Visual assets

The current gallery replaces the older synthetic interface recreations:

| File | Size | Content |
|---|---|---|
| `ukiyo-store-cover.png` | 1200x750 | Reduced recovered-homepage composition |
| `store-wordpress.png` | 3200x2000 | Latest retained restored catalogue composition |
| `store-angular-catalog.png` | 2880x2800 | Fresh local Angular catalogue capture at 2x |
| `store-angular-product.png` | 2880x2000 | Fresh local Angular product capture at 2x |
| `wordpress-responsive-hero.png` | 3200x2000 | Original locally restored homepage in illustrative desktop/mobile frames |
| `wordpress-responsive-categorias.png` | 3200x2000 | Restored category navigation composition |
| `wordpress-responsive-coleccion.png` | 3200x2000 | Restored collection composition |
| `wordpress-responsive-productos.png` | 3200x2000 | Restored product section composition |
| `wordpress-responsive-marca.png` | 3200x2000 | Restored brand section composition |

WordPress compositions were copied from the latest responsive assets retained on the external disk. They contain real captures of the recovered interface in illustrative browser/device frames. Docker was not started again for this update. The mobile catalogue composition exposes horizontal clipping; these assets are not evidence of flawless responsive behaviour.

Angular captures were generated on 25 October 2026 with Chrome headless, at a 1440px CSS viewport width and device scale factor 2, against the development server on localhost port 4201. The catalogue viewport is 1400px tall and the product viewport is 1000px tall. Fonts and visible images were allowed to load before capture. The pages rendered 74 catalogue cards and the product `541` (Japanese Shirt 'Newspaper'), with no unloaded/broken images visible in either capture.

The locally modified product service reads `PRODUCTS` from a local catalogue module, including product media recovered from the WordPress backup. These are not the former six-product public-domain-art mockups, and not a live Firebase connection. The application source and its existing local changes were not edited or committed by this gallery update.

The screenshots include historical fashion photography, product prints and third-party characters. No public-domain status or licence to reuse those materials is claimed. Database dumps, credentials, orders, customer records and logs remain excluded.

## Validation

- The published PNG files are checked for valid headers and expected dimensions when updating the documentation.
- Both architecture SVGs parse as valid XML.
- The README image paths resolve to files in `docs/images/`.
- Angular development compilation and catalogue/product rendering were exercised for the fresh captures. No unit tests, production build, Express, Stripe, Firebase authentication, SMTP or checkout flow was validated. The WordPress restore is a historical session record, not a fresh execution.

## Evidence limits

- WordPress compositions reflect a historical local restoration; Angular captures reflect a locally adapted frontend, not the unchanged upstream repository.
- Source-level backend features remain unvalidated; displaying 74 cards does not validate all product images, variants or interactions.
- The historical archive does not prove commercial performance.
- The case study does not include customer data or orders. Store branding, historical photography and product artwork visible in the gallery are presentation evidence only, not reusable asset downloads.
