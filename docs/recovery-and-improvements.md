# Local recovery and storefront improvements

## What changed

The project is more than a source archive and illustrative mockups. A recovery session on **18 September 2026** records restoring the original WordPress storefront locally and refining its catalogue presentation. This page separates that historical work from the fresh documentation review on **25 October 2026**.

## Recovering the original interface

1. Located the complete WordPress ZIP in the external-disk backup, containing an All-in-One WP Migration `.wpress` archive dated August 2023.
2. Extracted the database and `wp-content` from that inner archive.
3. Started a local Docker environment using `wordpress:6.3.2-php8.1-apache` and `mysql:8.0`.
4. Imported the database, adjusted the site URLs for localhost, including Elementor's escaped URLs, and reactivated Astra, Elementor, Pro Elements and WooCommerce.
5. Recorded an HTTP 200 response and captured the homepage, shop, category and product pages. The session reports 119 imported tables and a shop showing 74 products; these counts have not been independently rerun for this update.

This recovered the actual Astra/Elementor layout rather than approximating it in a standalone HTML mockup. Database restoration was necessary because the page-builder content was not contained in the theme files alone.

### Version boundaries

The outer archive review identifies WordPress **6.6.2**, WooCommerce **9.2.3** and Astra **4.0.1**. The recovery session used a **WordPress 6.3.2 Docker image** to restore an older, nested full-site snapshot. These are different evidence layers, not an upgrade sequence. The resulting runtime versions of all components were not independently checked for this update.

**No WordPress or WooCommerce version upgrade is claimed.** No current dependency, security or compatibility audit is implied by a successful historical local restore.

## Catalogue presentation improvements

The session records a local must-use plugin, `ukiyo-clean-catalog.php`, scoped to the shop and category pages:

| Change | Design intent |
|---|---|
| Consistent 1:1 image areas and centred product images | Make mixed product imagery easier to scan |
| Product titles limited to two lines | Keep card heights and reading rhythm more regular |
| Removal of star ratings in the catalogue | Reduce visual clutter |
| Black/yellow action buttons | Align actions with the store's identity |
| More consistent spacing, grid and pagination | Make catalogue browsing visually calmer |

These were local presentation changes, not a production rollout. The final session offered to extend the cleanup to the Elementor homepage grid; it does **not** establish that this follow-up was completed. The plugin source is not retained in this repository and was not recovered during this documentation update, so this is a historical change record, not an installable patch.

## Responsive portfolio treatment

The retained external-disk assets contain responsive compositions for the hero, catalogue, categories, collection, products and brand sections. The revised direction replaced technology chips and decorative statistics with a quieter composition: black brand background, Japanese typography motif, white logo, yellow underline and desktop/mobile views of the same section.

The published [responsive homepage composition](images/wordpress-responsive-hero.png) uses captures of the recovered interface inside illustrative frames. It is distinct from the older standalone WordPress recreation, which remains explicitly labelled in the README. Catalogue and product captures with third-party character artwork remain outside this repository.

The hero contains historical fashion photography and branding. It is not public-domain material and this repository grants no rights to extract or reuse it.

## Evidence and validation limits

- **Historical execution:** the recovery conversation records the restore, HTTP response, URL corrections, plugin activation, screenshots and catalogue CSS changes.
- **Retained assets:** the responsive hero was visually inspected and copied from the original external-disk portfolio asset collection. Other local compositions were not republished automatically.
- **This update:** documentation and published asset integrity only; no Docker startup, database import, Angular build or browser interaction was repeated.
- **Not established:** current availability, production readiness, authentication, checkout, payment processing, email delivery, conversion improvements or measured performance gains.
- **Private material excluded:** full-site archives, database dumps, credentials, customer/order records and logs.

The Angular architecture remains a separate academic migration. The WordPress recovery is not evidence that its Firebase, Express, Stripe or email flows work today.
