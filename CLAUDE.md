# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio site for Diler Zaza (l0minous.github.io). Single-page React app with interactive features, deployed to GitHub Pages.

## Commands

- `npm run dev` - Start Vite dev server on port 3000
- `npm run build` - Build to `build/` directory
- `npm ci --legacy-peer-deps` - Install dependencies (`--legacy-peer-deps` required due to Radix UI peer dependency conflicts with React 18)

No test runner or linter is configured.

## Architecture

**Stack:** React 18 + TypeScript + Vite (SWC plugin) + Tailwind CSS v4 (pre-compiled in `src/index.css`)

**No router.** Navigation between views uses conditional rendering via state in `App()`. The `showCreativeWork` state toggles between the main site and the creative work gallery page.

### Key Files

- `src/App.tsx` - Everything lives here: `Header`, `QuoteSection`, `ExperienceCard`, `ProjectCard`, `ProjectsSection`, `CreativeWorkSection`, `Footer`, and the root `App` component. No component extraction to separate files (except interactive features below).
- `src/main.tsx` - Entry point, renders `<App />` into `#root`
- `src/index.css` - Pre-compiled Tailwind v4 output (not a Tailwind source file). **Do not edit the Tailwind portion.** Append new custom CSS at the bottom only.
- `index.html` - Loads "Press Start 2P" Google Font for the Playground feature.

### Interactive Features (separate components)

- `src/components/playground/` - MacPaint-style drawing app. Opened as overlay from header's "PLAYGROUND" link. `MacPaintApp.tsx` is the entry point; uses Canvas API.
- `src/components/creative-work/CreativeWorkPage.tsx` - Infinite canvas gallery with draggable pan + momentum. Images from Behance stored in `public/creative-work/`. Opened via "CREATIVE WORK" header link.
- `src/imports/Test.tsx` - Figma-generated component (work experience graphics). Auto-generated; don't refactor into the App.tsx pattern.

### Design System

- Background: black (`#000000`)
- Text color: `#e0eedf`
- Primary font: `font-['Helvetica:Light',sans-serif]` (Tailwind class), italic variant: `font-['Austin:Hairline_Italic',sans-serif]`
- Font sizes use `clamp()` for responsiveness, e.g. `clamp(0.875rem, 1.1vw, 18px)` for body text, `clamp(2rem, 6.3vw, 95px)` for headings
- Header text elements have random sliding animations and character glitch effects
- Max content width: `1512px`

### Deployment

GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) auto-deploys on push to `main`:
1. `npm ci --legacy-peer-deps`
2. `npm run build`
3. Creates `.nojekyll` in build output
4. Deploys `build/` to GitHub Pages

Build output goes to `build/` (not `dist/`).

### Vite Config Notes

`vite.config.ts` has extensive resolve aliases mapping versioned package names (e.g. `'vaul@1.1.2': 'vaul'`) and Figma asset paths. The `@` alias maps to `./src` — use `@/components/...` style imports.

### Static Assets

- `public/creative-work/` - Behance project cover images (12 .webp files)
- `public/` - Also contains legacy PNG images and a large MP4 video (~468MB). Avoid committing additional large media files.
- `src/components/ui/` - Large collection of Radix UI/shadcn components (mostly unused by the main site, available if needed)
