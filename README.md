# Portfolio — Next.js

A dark, minimal full-stack developer portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customization

**All your personal content lives in one file:**

```
src/data/portfolio.ts
```

Edit `personalInfo`, `projects`, `skills`, and `experiences` — the entire site updates automatically.

## Project Structure

```
src/
├── app/               # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── layout/        # Navbar, Footer
│   ├── sections/      # HeroSection, AboutSection, ProjectsSection, ...
│   └── ui/            # Badge, SectionHeader (reusable primitives)
├── data/
│   └── portfolio.ts   # ← EDIT THIS FILE to personalize
├── hooks/             # useActiveSection, useScrolled
├── lib/
│   └── utils.ts       # cn() helper
└── types/
    └── index.ts       # TypeScript interfaces
```

## Dependencies

| Package | Purpose |
|---|---|
| `next` 14 | Framework (App Router, SSR, image optimization) |
| `react` / `react-dom` 18 | UI library |
| `typescript` | Type safety |
| `tailwindcss` | Utility-first styling |
| `autoprefixer` | CSS vendor prefixes (PostCSS plugin) |
| `postcss` | CSS transformation pipeline |
| `framer-motion` | Scroll-triggered animations, page transitions |
| `lucide-react` | Icon library (tree-shakeable SVG icons) |
| `clsx` | Conditional className composition |
| `tailwind-merge` | Merges Tailwind classes without conflicts |

## Deployment (GitHub Pages)

This site uses Next.js static export and deploys via GitHub Actions on push to `master`.

1. In the repo: **Settings → Pages → Source → GitHub Actions**
2. Push to `master` (or run the **Deploy to GitHub Pages** workflow manually)
3. Site URL: https://jaoskii.github.io

Local static build:

```bash
npm run build   # outputs to out/
```
