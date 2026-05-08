# Ahmad Haidar Albaqir — Portfolio

Personal portfolio and blog for Ahmad Haidar Albaqir, a Software Engineer and Go Backend Developer.

Built with **React 19**, **Vite**, **Tailwind CSS**, and **React Router**.

## Features

- **Pages** — Home, About, Projects, Experience, Blog, Contact
- **Blog** — Markdown-based posts covering both tech (Go, PostgreSQL) and personal finance topics in Indonesian/English
- **Dark mode** — system-aware with manual toggle, persisted to `localStorage`
- **Scroll reveal animations** — `IntersectionObserver`-driven fade-up on scroll entry

## Getting Started

```bash
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Tech Stack

| Layer | Library |
|---|---|
| UI | React 19 |
| Bundler | Vite 8 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 3 (class-based dark mode) |
| Markdown | react-markdown + remark-gfm |
| Icons | lucide-react |

## Project Structure

```
src/
├── data/
│   ├── content.js        # all site data (projects, experiences, blog metadata)
│   └── posts/            # blog post bodies as .md files
├── pages/                # one file per route
├── components/           # Navbar, Footer
└── hooks/
    ├── useDarkMode.js
    └── useScrollReveal.js
```

## Adding a Blog Post

1. Create `src/data/posts/<slug>.md`
2. Import it in `src/data/content.js` with the `?raw` suffix:
   ```js
   import myPost from './posts/my-post.md?raw'
   ```
3. Add an entry to the `blogPosts` array:
   ```js
   {
     id: 7,
     title: 'Post Title',
     excerpt: 'Short description.',
     category: 'tech',        // 'tech' | 'finance'
     date: 'May 9, 2026',
     readTime: '5 min read',
     slug: 'my-post',
     featured: false,
     body: myPost,
   }
   ```

Set `featured: true` to surface the post on the Home page.
