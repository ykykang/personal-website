# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (Vite, localhost:5173)
npm run build      # production build → dist/
npm run preview    # preview production build locally
```

No test suite or linter is configured.

## Architecture

Single-page React app built with Vite + React Router + Tailwind CSS.

**Routing** — `App.jsx` owns all routes. `ScrollToTop` component resets scroll position on every navigation.

**Dark mode** — `useDarkMode` hook (localStorage + `prefers-color-scheme`) toggles a `dark` class on `<html>`. Tailwind is configured with `darkMode: 'class'`. All pages and components use Tailwind's `dark:` variants against the custom palette (`ink`/`chalk`/`stone`/`mist`).

**Custom colors** (defined in `tailwind.config.js`):
- `ink` / `ink-light` — dark backgrounds and text
- `chalk` / `chalk-dark` — light backgrounds and text
- `stone`, `mist` — secondary text and borders
- `accent` — rarely used; same as dark ink

**Custom fonts**: `font-display` (DM Serif Display), `font-body` (DM Sans), `font-mono` (JetBrains Mono) — loaded from Google Fonts in `index.html`.

**Content** — all data (projects, experiences, blog post metadata) lives in `src/data/content.js`. Blog post bodies are Markdown files in `src/data/posts/` imported as raw strings via Vite's `?raw` suffix. `react-markdown` with `remark-gfm` renders them inside `BlogPost.jsx` using a fully custom `components` map for consistent styling.

**Scroll animations** — `useScrollReveal` hook uses `IntersectionObserver` to add `animate-fade-up` on scroll entry. Custom `fadeUp` and `fadeIn` keyframes are defined in `tailwind.config.js`.

## Adding content

**New blog post:**
1. Create `src/data/posts/<slug>.md`
2. Import it in `src/data/content.js` with `?raw`
3. Add an entry to the `blogPosts` array (required fields: `id`, `title`, `excerpt`, `category` (`'tech'` or `'finance'`), `date`, `readTime`, `slug`, `featured`, `body`)

**New project or experience:** edit the `projects` or `experiences` arrays in `src/data/content.js`.
