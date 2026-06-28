# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`justkevin.dev` — a personal site/blog/portfolio built as a **static Astro 7 site**. Package manager is **pnpm** (see `packageManager` field; do not use npm/yarn).

## Commands

- `pnpm dev` — local dev server with HMR
- `pnpm build` — static production build to `dist/`
- `pnpm preview` — serve the built `dist/` locally
- `pnpm exec prettier --write .` — format (uses `prettier-plugin-astro`)

There is **no test suite and no lint script** — formatting via Prettier is the only automated check.

## Architecture

### Content is file-based and auto-discovered
Blog posts live in `src/pages/blog/` as `.md`/`.mdx` files. There is no content collection config — instead:
- `src/pages/blog/index.astro` and `src/pages/rss.xml.ts` both build their lists via `import.meta.glob(..., { eager: true })` and sort by `frontmatter.date`.
- **To add a post, just drop a new `.md`/`.mdx` file in `src/pages/blog/`** — it auto-appears in the index and RSS feed. No registration needed.

Every blog post needs this frontmatter:
```yaml
---
layout: "@layouts/DefaultLayout.astro"
title: "..."
date: "YYYY-MM-DD"
---
```
The `layout` field is what wraps markdown in the site chrome; `title` and `date` drive the index/RSS. Use `.mdx` when a post needs components (e.g. `ImageWithCaption` with imported image assets).

### Layouts
- `BaseLayout.astro` — the real layout: `<head>`, `Header`, and a large `<style is:global>` block defining all design tokens.
- `DefaultLayout.astro` — thin wrapper around `BaseLayout` that adapts the `frontmatter.title` prop; this is what markdown posts target.
- `PrintLayout.astro` — separate layout for CV print pages (`cv-print.astro`, `lebenslauf-print.astro`), uses `PrintHeader` and forces `color-scheme: dark`.

**Gotcha:** `BaseLayout` and `PrintLayout` each contain a *full copy* of the same global `:root` token + base-element CSS block. Changes to design tokens or base element styles must be made in **both** files to stay consistent.

### Theming
Colors are the Catppuccin palette defined as CSS custom properties using `light-dark(<light>, <dark>)`, so the active theme is driven entirely by the CSS `color-scheme` property. `src/components/ThemeSelection/themeSelection.ts` is client-side script that reads/writes `localStorage["theme"]` (`"light"` | `"dark"` | `"light dark"`) and sets `color-scheme` on `<html>`. New colors should use `var(--<name>)` tokens, not hardcoded values.

### CV is data-driven
`cv.astro` (English) and `lebenslauf-print.astro` (German) hold an array of `CVEntry` objects (`src/types/CVEntry.ts`) rendered through `CVEntryElement` / `PrintCVEntryElement`. To edit CV content, edit the `cvEntries` array in the page file — not a separate data file.

## Conventions

- **Path aliases** (from `tsconfig.json`): `@components/*`, `@layouts/*`, `@assets/*`. Prefer these over deep relative paths.
- **Images**: import from `src/assets/...` and render via Astro's `astro:assets` `<Image>` (for optimization) — `sharp` is the configured image processor. Post-specific assets are grouped in `src/assets/<post-slug>/`.
- **Icons**: SVGs in `src/icons/` are consumed via `astro-icon` (`<Icon name="..." />`).
- TypeScript is in Astro's `strict` mode.
