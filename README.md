# Ukiyo Store commerce case study

A documentation-only study of an apparel storefront across two stages: a WordPress/WooCommerce storefront archived from 2022-2024 and an Angular final-degree migration from 2023-2024. It describes the structure visible in the sources and separates source-level implementation from runtime validation.

The story also includes a September 2026 local recovery: restoring the original WordPress design from a full-site backup, refining the catalogue presentation and producing responsive portfolio compositions from the restored interface. [Recovery and design improvements](docs/recovery-and-improvements.md).

![Ukiyo Store project cover](docs/images/ukiyo-store-cover.png)

*Project cover. It presents the two stages; it is a portfolio composition, not an interface capture.*

## At a glance

| | Historical stage | Angular stage |
|---|---|---|
| Period | 2022-2024 | 2023-2024 |
| Nature | Configured WordPress/WooCommerce storefront archive | Final-degree software migration |
| Runtime | Local restore recorded in September 2026; no current public deployment verified | Source review only; no end-to-end validation |
| Core | WordPress, WooCommerce, Astra, Elementor | Angular, Firebase, Express, Stripe |
| Visuals | Restored homepage capture in a responsive composition, plus a labelled recreation | Portfolio recreations with public-domain art |

## Historical storefront archive

The archive contains a configured WordPress 6.6.2 and WooCommerce 9.2.3 storefront with the Astra 4.0.1 theme, Elementor, payment and marketing plugins, and product media dated 2022-2024.

- The plugin set includes WooCommerce Payments, PayPal Payments, Google Listings and Ads, Pinterest, Facebook for WooCommerce, MailPoet and Woo Product Feed Pro.
- The media library and archive metadata show catalogue media and a full-site archive dated August 2023.
- The archive is a historical storefront record. It is not evidence of sales, revenue, customer counts or current operation.
- The theme, platform and plugins are third-party components; this case study does not attribute their development to the author.

## Angular migration

![Angular architecture](docs/architecture-angular.svg)

*Source-level architecture. It explains the observed structure; it is not a runtime capture.*

The Angular application is a single-page storefront with Firebase Authentication and Realtime Database, an Express API for checkout and email, Stripe Checkout, and route guards for customer and administrator areas.

The migration is observable in structure only: routes, models, services, package files and the upstream README. No end-to-end migration procedure is claimed.

## Visuals

### Original design, recovered locally

![Recovered Ukiyo storefront homepage shown on desktop and mobile](docs/images/wordpress-responsive-hero.png)

*Original storefront interface captured from the local restoration, presented in illustrative desktop and mobile frames. This is not the current public website, a new deployment or a public-domain image. The fashion photography belongs to the historical storefront media; no reuse rights are granted.*

The recovery brought back the Astra/Elementor homepage, including the “BE JAPAN” hero, navigation and original black-and-white identity. The local catalogue was subsequently refined with consistent image proportions, shorter titles, simpler actions and more regular spacing. These are presentation changes, not a claim of improved sales or performance. See the [recovery record and evidence limits](docs/recovery-and-improvements.md).

### Illustrative portfolio recreations

The three images below remain labelled recreations, not captures of the restored interface. Their printed artwork is public-domain ukiyo-e; browser frames are illustrative. Raw captures containing third-party character artwork are intentionally excluded.

### WordPress/WooCommerce storefront

![WordPress storefront recreation](docs/images/store-wordpress.png)

*Storefront recreation. Public-domain ukiyo-e artwork; illustrative browser frame; not a live capture.*

### Angular catalogue

![Angular catalogue recreation](docs/images/store-angular-catalog.png)

*Catalogue recreation. Public-domain ukiyo-e artwork; not a live capture.*

### Angular product detail

![Angular product detail recreation](docs/images/store-angular-product.png)

*Product detail recreation. Public-domain ukiyo-e artwork; not a live capture.*

## Source-level features

| Capability | Source evidence | Runtime status |
|---|---|---|
| Catalogue and product detail | `home` and `product/:key` routes; product service and model | Implemented in source; not tested |
| Filters and category browsing | Home components and category service | Implemented in source; not tested |
| Cart | `cart` route; cart service and model | Implemented in source; not tested |
| Wishlist | `wishlist` route; wishlist service; auth guard | Implemented in source; not tested |
| Authentication | Login component, auth service, AngularFireAuth | Implemented in source; not executed |
| Admin product management | Admin routes with auth and admin guards; product service | Implemented in source; not tested |
| Order history and admin orders | `orders` and `adminorders` routes; order service | Implemented in source; not tested |
| Checkout return and email | Success route with session id; Express and Nodemailer packages | Implemented in source; not executed |

The table records the Angular source review, not a working product. It does not validate routes, builds, tests, payments or email. The separately recorded WordPress restoration does not validate the Angular application.

## Stack

| Layer | Versions observed | Note |
|---|---|---|
| Angular frontend | Angular 14.2, TypeScript 4.7, RxJS 7.5, Material/CDK 13, Tailwind 3.4 | Legacy toolchain |
| Application services | Firebase 9.9, AngularFire 7.4, Express 4.18, Stripe 10.17, Nodemailer 6.9 | Server and client split |
| Historical storefront | WordPress 6.6.2, WooCommerce 9.2.3, Astra 4.0.1, Elementor | Archive snapshot, not current |

## Dates and origin

- 2022-09: first storefront media in the archive.
- 2023-08: full-site archive created.
- 2023-09: first Angular commit.
- 2024-06: final-degree delivery.
- 2025-09: documentation update in the source repository.
- 2026-09-18: local WordPress restoration, catalogue presentation changes and responsive compositions recorded in the recovery session.
- 2026-10-25: recovery evidence reconciled with this case study; restored homepage composition added.

Dates describe evidence, not employment periods.

## Visual provenance

The published mockups use public-domain ukiyo-e works from Wikimedia Commons:

| Design | Author | Work |
|---|---|---|
| Great Wave off Kanagawa | Hokusai | *Thirty-six Views of Mount Fuji* (1831) |
| Red Fuji | Hokusai | *Fine Wind, Clear Morning* (1831) |
| Sudden Shower over Shin-Ohashi Bridge | Hiroshige | *One Hundred Famous Views of Edo* (1857) |
| Plum Garden at Kameido | Hiroshige | *One Hundred Famous Views of Edo* (1857) |
| Mishima Pass in Kai Province | Hokusai | *Thirty-six Views of Mount Fuji* (1831) |
| Storm below the summit | Hokusai | *Thirty-six Views of Mount Fuji* (1831) |

The t-shirt base is the project's own mockup; the printed artwork was substituted with these public-domain works. The WordPress and Angular names are third-party platforms; their themes, plugins and frameworks are not claimed as original work.

## Limitations and attribution

- The Angular project is academic and was not verified in production.
- The historical stage is a WordPress/WooCommerce archive, not a custom CMS or checkout implementation.
- No sales, revenue, conversion, customer or traffic claim is made.
- The restored homepage composition shows the original interface; the other three interface images are explicitly labelled portfolio recreations.
- Raw captures containing third-party character artwork are not published.
- The historical local restore is documented from the recovery session and retained assets; it has not been rerun for this update. No current public deployment, checkout or payment flow is verified.
- This repository contains documentation and portfolio visuals, not the legacy application's source code. No licence for reuse is granted.

Technical details are in `docs/technical-notes.md`.
