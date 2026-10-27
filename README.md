# jaoskii.github.io

Portfolio of Rajhi John Tabora, full stack developer. Live at https://jaoskii.github.io.

React 19 + TypeScript, built with Vite; Tailwind CSS 4 and daisyUI 5. Two pages, same URLs as before:

- `index.html` → `src/home/`: hero, profile, work carousel, process, control panel, experience, stack, side projects, contact
- `work.html` → `src/work/`: full-screen case-study slider (`#<project-id>`, `#all` opens the index)
- `src/data/projects.ts`: every project shown on both pages (screenshots, shot groups, NDA fields)
- `src/components/`: project art, covers, links and the NDA case file
- `src/styles/`: page skins (`home.css`, `work.css`), shared slider structure, NDA styles
- `public/assets/`: images and the CV PDF, served as-is at `assets/...`

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build to dist/
```

The contact form posts to the inventee API (`/jao-api/contact`) with an `X-Jao-Key` header. The key comes from
`VITE_JAO_CONTACT_KEY` at build time; the Pages workflow sets it from the `JAO_CONTACT_KEY` repository variable
(Settings → Secrets and variables → Actions → Variables).
Pushing to `master` builds and deploys to GitHub Pages through `.github/workflows/deploy.yml`.
