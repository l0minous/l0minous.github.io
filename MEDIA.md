# Portfolio film

`public/films/portfolio-loop.mp4` is a web-optimized, silent copy of the 50-second film referenced by the original portfolio:

- Title: MVI 3357 2
- Channel: L0M
- Source: https://www.youtube.com/watch?v=LX6S7IWIV2Q
- Delivery: 1280 × 720, H.264 MP4, fast-start metadata, no audio track.

It is served directly by the portfolio, using a native looping video element with no player controls or third-party embed.

## Gallery images

All 43 entries from the original gallery are preserved in `src/components/creative-work/gallery-originals.json`. Original files are kept intact.

`scripts/optimize-gallery.py` generates orientation-correct WebP thumbnails (up to 640px) and larger previews (up to 1800px), preserving embedded color profiles. Run it with Pillow installed when changing source images. Generated assets and metadata are committed so the normal website build needs no image tooling.

The gallery preloads and decodes thumbnails in parallel, then reveals the complete grid together. Larger previews load when an image is opened.
