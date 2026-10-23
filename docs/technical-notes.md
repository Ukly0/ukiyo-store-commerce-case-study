# Technical notes

Engineering notes for the Ukiyo Store commerce case study. This document describes the observable source structure and the published visual assets. It is not a runtime report.

## Source boundary

- The Angular project was reviewed read-only through source files: routes, modules, models, selected services, package files and the repository tree.
- The historical WordPress archive was inspected by structure, version files, plugin directories, media inventory and log filenames. Database, orders, customer records and log content were not opened.
- No live URL, deployment, build or test run was available.

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

The repository publishes four PNG files in `docs/images/`:

| File | Size | Content |
|---|---|---|
| `ukiyo-store-cover.png` | 1200x630 | Project cover with the two stages |
| `store-wordpress.png` | 1440x900 | WordPress/WooCommerce storefront composition |
| `store-angular-catalog.png` | 1440x900 | Angular catalogue composition |
| `store-angular-product.png` | 1440x900 | Angular product-detail composition |

The three interface images are portfolio recreations prepared from the project's mockup assets. Browser and device frames are illustrative. The cover is a project composition, not an interface capture.

The printed artwork is public-domain ukiyo-e sourced from Wikimedia Commons: Hokusai's *Great Wave off Kanagawa*, *Red Fuji*, *Mishima Pass in Kai Province* and *Storm below the summit*; Hiroshige's *Sudden Shower over Shin-Ohashi Bridge* and *Plum Garden at Kameido*. The t-shirt base comes from the project's own mockup.

Raw captures containing third-party character artwork are not published. The repository does not include the WordPress database, orders, customer records, logs or original product photography.

## Validation

- The four PNG files open and report the expected dimensions.
- Both architecture SVGs parse as valid XML.
- The README image paths resolve to files in `docs/images/`.
- Angular build, tests, Express server, Stripe, Firebase, SMTP and WordPress restore were not run.

## Evidence limits

- The visual recreations do not demonstrate the original frontend or its visual fidelity.
- Source-level features are not runtime-validated.
- The historical archive does not prove commercial performance.
- The case study does not include customer data, orders or original brand assets.
