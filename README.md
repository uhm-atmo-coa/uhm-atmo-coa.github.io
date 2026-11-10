# ATMO Coalition website

The public site of the ATMO Coalition (Atmospheric Sciences Researchers Coalition at UH Mānoa), live at https://uhm-atmo-coa.github.io.

This repo is intentionally conservative.

The goal is not to build the fanciest frontend stack. The goal is to build a student organization website that is easy to understand, easy to update, and unlikely to break after the original developers leave.

## Maintenance Philosophy

This project is optimized for low long-term upkeep.

- Use React for developer ergonomics, but keep the rest of the stack small.
- Build a static site, not a framework-heavy app.
- Treat the compiled `dist/` output as the real deployable product.
- Keep dependencies few, boring, and pinned to exact versions.
- Prefer obvious code over abstraction.
- Optimize for the next student inheriting the repo, not for cleverness.

In practice, that means:

- `React` for UI
- `Vite` for a simple web build
- `Tailwind CSS` for styling
- `TypeScript` for basic guardrails
- `i18next` only because bilingual content is an actual product need here

It also means we intentionally do not use:

- `Next.js`
- a runtime server (pages are prerendered to static HTML at build time; nothing runs server-side once deployed)
- API routes in this repo
- a routing dependency unless the site grows beyond what a tiny local route table can handle
- a UI component library
- a state management library
- animation libraries
- `react-native-web`

If a new dependency does not remove more complexity than it adds, do not add it.

## Tooling Rules

- Node is pinned to `20.x` in `.nvmrc`.
- Yarn is pinned via `packageManager` in `package.json`.
- Package versions in `package.json` are exact, not ranges.
- `yarn.lock` is committed and should stay committed.
- Tailwind is used without plugins and with a simple config.

This is deliberate. The stack should drift as little as possible.

## Setup

Use Node 20 (pinned in `.nvmrc`; the deploy workflow uses the same file) and the
Yarn version pinned in `package.json` via Corepack.

If you use `nvm`:

```bash
nvm install
nvm use
```

Install dependencies (Corepack picks up the pinned Yarn 4):

```bash
corepack enable        # once per machine; or prefix commands with `corepack`
yarn install
```

Start the dev server (http://localhost:5173 by default):

```bash
yarn dev
```

Create a production build:

```bash
yarn build
```

`yarn build` does four things: type-checks (`tsc`), builds the client bundle into
`dist/`, builds a server bundle of the app (`build:ssr`), and runs
`scripts/prerender.mjs`, which renders every route to static HTML. Fix any type
error before pushing; the deploy runs the same command.

Preview the production build locally:

```bash
yarn preview
```

## Local testing with Docker Compose

Start the site with Node 20 and the pinned Yarn dependencies in Docker:

```bash
docker compose up --build -d
```

Open http://localhost:5187/board. To choose another host port, run
`ATMO_PORT=5188 docker compose up -d`. Changes to `src/`, `public/`, and
`index.html` update the running development server. Rebuild after changing
dependencies or configuration.

Run the full production build inside the container:

```bash
docker compose exec web yarn build
```

Stop the local site with `docker compose down`.

Board names, responsibilities, and research summaries live in
`src/pages/BoardPage.tsx`. Supporting roles appear below the board.
Portrait files live in `public/images/team/`.

## Deployment (GitHub Pages)

The site deploys automatically with GitHub Actions (`.github/workflows/deploy.yml`):

- **Trigger:** every push to `main` (and manual runs from the Actions tab). Pushes to
  other branches do not deploy, so work on a branch and merge to `main` when ready.
- **Steps:** `yarn install --immutable`, `yarn build`, then upload `dist/` to GitHub Pages.

There is no server: `scripts/prerender.mjs` writes a real HTML file for each route,
so every URL returns a 200 with indexable markup:

- `/` → `dist/index.html`
- `/about` → `dist/about.html` and `dist/about/index.html` (same for `/board`, `/contact`)
- any other path → `dist/404.html` (served by Pages with a 404 status)
- plus `sitemap.xml`, `robots.txt` and `.nojekyll`

When you add a route, add it to `src/utils/routes.ts` and give it a title and
description in `src/utils/seo.ts`; the prerender and sitemap pick it up from there.

## Routing

Routing is intentionally local and small.

- `src/utils/routes.ts` is the source of truth for the route list
- `src/hooks/useCurrentPath.ts` keeps React in sync with the browser URL
- `src/components/NavLink.tsx` uses `history.pushState` for in-app navigation
- each page lives in `src/pages/*.tsx`

Current routes:

| Path       | Page file                   | Content                                         |
| ---------- | --------------------------- | ----------------------------------------------- |
| `/`        | `src/pages/HomePage.tsx`    | Hero, mission, focus areas, join call-out       |
| `/about`   | `src/pages/AboutPage.tsx`   | Purpose, membership, how to get involved        |
| `/board`   | `src/pages/BoardPage.tsx`   | Board cards and supporting roles                |
| `/contact` | `src/pages/ContactPage.tsx` | Anonymous form link and Coalition email         |

Unknown paths render `src/pages/NotFoundPage.tsx`. `App.tsx` scrolls to the top on
every route change.

If the site eventually needs nested routing, route params, loaders, or other advanced routing features, that would be the point to reconsider a dedicated router package.

## What To Edit (where content lives)

Most copy is written directly in the page files.

- `src/pages/HomePage.tsx`: home page text and the `focusAreas` array
- `src/pages/AboutPage.tsx`: About text and the `values` array (paraphrases the Coalition
  constitution; keep it in line with the constitution when either changes)
- `src/pages/BoardPage.tsx`: `boardMembers` and `supportingRoles` arrays (name, title, bio,
  research, photo, and `links` for email / LinkedIn / Google Scholar; an icon shows for
  each link that is set)
- `public/images/team/`: portrait files (any aspect; cards crop them to a 3:4 box)
- `src/pages/ContactPage.tsx`: the anonymous form URL and the contact email
- `src/utils/seo.ts`: page titles and descriptions used by the prerender
- `src/App.tsx`: header, footer and page shell
- `src/components/SiteNav.tsx`, `src/utils/routes.ts`: menu and route list
- `src/locales/en/common.json`: the few strings that go through i18n (footer tagline)
- `src/constants/brand-tokens.json`: brand colors, spacing, typography, radius, and shadows
- `src/index.css`: global styles and the Tailwind entrypoint

## Project Structure

```text
.
├── .github/workflows/deploy.yml   # build + deploy to GitHub Pages on push to main
├── .nvmrc
├── index.html
├── package.json
├── public/                        # static files (logos, social image, team photos)
├── scripts/prerender.mjs          # build-time HTML for each route
├── tailwind.config.cjs
├── vite.config.ts
└── src
    ├── App.tsx
    ├── entry-server.tsx           # used only by the prerender
    ├── main.tsx
    ├── components/                # LanguageToggle (paused), NavLink, SiteNav
    ├── constants/                 # brand tokens
    ├── hooks/                     # useCurrentPath, useInView
    ├── i18n/                      # i18next setup and resources
    ├── locales/{en,haw}/common.json
    ├── pages/                     # Home, About, Board, Contact, NotFound
    └── utils/                     # routes.ts, seo.ts
```

## Why i18n Stays

Internationalization is the one intentional extra layer in this repo. It is there for
English and Hawaiian content.

**The Hawaiian toggle is paused** until Hawaiian copy exists (page text is currently
English-only and lives in the page files). The i18n plumbing and `src/locales/haw/`
stay in place. To turn the toggle back on:

1. In `src/App.tsx`, uncomment the `LanguageToggle` import and the `<LanguageToggle />` block in the header.
2. In `src/i18n/index.ts`, set `lng: detectLanguage()` again.
3. Move page copy into `src/locales/*/common.json` so it can actually be translated.

If the Hawaiian requirement goes away, this is one of the first layers to reconsider.

## Tailwind and Brand Tokens

Tailwind is used in a restrained way.

- no Tailwind plugins
- no custom runtime styling system
- one token file feeding the Tailwind theme

`src/constants/brand-tokens.json` is the source of truth for:

- color palette
- typography
- spacing
- border radius
- shadows

Those values flow into `tailwind.config.cjs`, so most visual updates happen in one place.

## Rules For Future Contributors

- Do not add dependencies casually.
- Do not introduce Next.js, a router package, or backend features unless there is a concrete requirement.
- Do not loosen exact versions back to `^` or `~`.
- Do not add a build-time plugin unless the benefit is obvious and durable.
- Prefer editing content and styles over inventing abstractions.
- Keep the README updated if the workflow changes.

The standard for any change is simple:

Will the next student understand how to run it, change text, and deploy it without debugging a complicated toolchain?

If the answer is no, the change is probably wrong for this project.
