# Sample catalogue and version

## Frontend version

- Repository: [Ukiyo-Store-Angular](https://github.com/Ukly0/Ukiyo-Store-Angular).
- Revision used for the local build: `40f7f820e876c3c1a16b336950f78941ecb131db`.
- The application source is the June 2024 final-degree revision; later upstream changes are documentation updates.
- The local build excludes production environment files, server credentials and historical demo-login hints.

## The six sample shirts

The artwork and shirt base already existed in the project's brand assets. No new shirt artwork was generated for this case study.

| Asset | Sample | Artwork |
| --- | --- | --- |
| `ola.png` | The Great Wave | Katsushika Hokusai, *The Great Wave off Kanagawa*, 1831 |
| `fuji-rojo.png` | Red Fuji | Katsushika Hokusai, *Fine Wind, Clear Morning*, c. 1831 |
| `lluvia.png` | Sudden Shower | Utagawa Hiroshige, *Sudden Shower over Shin-Ohashi Bridge*, 1857 |
| `ciruelo.png` | Plum Garden | Utagawa Hiroshige, *Plum Garden at Kameido*, 1857 |
| `mishima.png` | Mishima Pass | Katsushika Hokusai, *Mishima Pass in Kai Province*, c. 1831 |
| `tormenta.png` | Storm below the Summit | Katsushika Hokusai, *Storm below the Summit*, c. 1831 |

The printed ukiyo-e works are public-domain material sourced through Wikimedia Commons. The shirt base is the project's existing mockup. This document records the supplied assets; it does not grant a new licence over the garment mockup, brand marks or unrelated storefront photography.

`sample-collection.json` records the selected revision, relative sample paths and SHA-256 hashes of the supplied PNG files. No private mount paths, account details, database or customer data are included.

## Working sample edition

- WordPress uses the Astra/Elementor/WooCommerce templates with six demo variable products.
- Angular uses the same six samples through its Firebase-backed services, connected only to local emulators.
- The landing animation cycles through the supplied samples.
- Demo sizes are S, M, L and XL; the photographed sample colour is White. Prices are explicit EUR fixtures, not historical prices or evidence of sales.
- Each sample supplies one front image. The Angular template reuses that view in its two image slots rather than fabricating a second photograph.
- Screenshots and the continuous video come from the running applications, not from composited static designs.

The sample edition is a presentation fixture, not a measured usability improvement or a historical catalogue claim.
