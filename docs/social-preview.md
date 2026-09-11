# Social sharing preview

The shared preview is `public/og-atmo-koolau.jpg`, a 1200 × 630 JPEG combining
a real photograph, a navy gradient, the existing coalition logo, and typography.
No generative image tools are used to create this card.

## Photo credit and permission

- Photograph: **Koolau Range 01.JPG**, Koʻolau Range on Oʻahu.
- Photographer: **ErgoSum88**.
- Source: https://commons.wikimedia.org/wiki/File:Koolau_Range_01.JPG
- Original: https://upload.wikimedia.org/wikipedia/commons/0/0d/Koolau_Range_01.JPG
- License: **Public domain**, explicitly released worldwide by the photographer;
  the file page also grants use for any purpose without conditions where that
  dedication is not legally possible. Verified September 11, 2026.
- Local source: `docs/assets/koolau-range-original.jpg` (unmodified).
- Changes: cropped, resized, navy gradient overlay, logo and text composited.

The public-domain dedication covers the photograph; the existing coalition
logo is a separate project asset.

## Updating the card

`scripts/render-social-preview.py` creates the final JPEG deterministically.
It requires Python with Pillow and defaults to macOS Arial fonts. On other
systems, pass `--font /path/to/regular.ttf --bold-font /path/to/bold.ttf`.

```sh
python3 scripts/render-social-preview.py
yarn build
```

The JPEG is checked in, so normal builds need no image tooling or extra
dependencies. `scripts/prerender.mjs` includes the absolute image URL,
dimensions, content type, and alt text on all generated pages, alongside
the large Twitter card. Future replacements should use a new filename and
update that script. The original square `public/og-image.jpg` remains available.
