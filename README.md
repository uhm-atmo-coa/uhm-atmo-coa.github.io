# Atmo Coalition Landing

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
- server-side rendering
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

Use Node 20 and the pinned Yarn version.

If you use `nvm`:

```bash
nvm install
nvm use
```

If Yarn is not already available through Corepack:

```bash
corepack enable
```

Install dependencies:

```bash
yarn install
```

Start the dev server:

```bash
yarn dev
```

Create a production build:

```bash
yarn build
```

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

## Static deployment

This site should deploy as static files.

The expected flow is:

1. Run `yarn build`
2. Take the generated `dist/` folder
3. Deploy `dist/` to static hosting

Do not make the live site depend on a Node server unless the organization has explicitly decided to take on that maintenance burden.

If you use client-side routes such as `/about` or `/contact`, the static host must rewrite unknown paths back to `index.html`.

For Firebase Hosting, the minimal pattern is:

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  }
}
```

Without that rewrite, loading `/about` directly in the browser will 404 even though the route works when clicked from inside the app.

## Routing

Routing is intentionally local and small.

- `src/utils/routes.ts` is the source of truth for the route list
- `src/hooks/useCurrentPath.ts` keeps React in sync with the browser URL
- `src/components/NavLink.tsx` uses `history.pushState` for in-app navigation
- each page lives in `src/pages/*.tsx`

Current starter routes:

- `/`
- `/about`
- `/events`
- `/resources`
- `/contact`

If the site eventually needs nested routing, route params, loaders, or other advanced routing features, that would be the point to reconsider a dedicated router package.

## What To Edit

Keep the editing surface obvious.

- `src/App.tsx`: main page structure
- `src/components/SiteNav.tsx`: top-level navigation
- `src/index.css`: global page styles and Tailwind entrypoint
- `src/constants/brand-tokens.json`: brand colors, spacing, typography, radius, and shadows
- `src/hooks/useCurrentPath.ts`: current URL state for the local router
- `src/i18n/resources.ts`: supported languages and namespaces
- `src/locales/en/common.json`: English copy
- `src/locales/haw/common.json`: Hawaiian copy
- `src/pages/*.tsx`: per-page content
- `src/utils/routes.ts`: route definitions and path helpers

## Project Structure

```text
.
├── .nvmrc
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
├── tsconfig*.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── assets
    │   ├── logo_color.png
    │   └── logo_mono.png
    ├── components
    │   ├── .gitkeep
    │   ├── LanguageToggle.tsx
    │   ├── NavLink.tsx
    │   ├── PagePlaceholder.tsx
    │   └── SiteNav.tsx
    ├── constants
    │   ├── brand-tokens.json
    │   └── brand.ts
    ├── hooks
    │   ├── .gitkeep
    │   └── useCurrentPath.ts
    ├── i18n
    │   ├── index.ts
    │   └── resources.ts
    ├── index.css
    ├── locales
    │   ├── en
    │   │   └── common.json
    │   └── haw
    │       └── common.json
    ├── main.tsx
    ├── pages
    │   ├── .gitkeep
    │   ├── AboutPage.tsx
    │   ├── ContactPage.tsx
    │   ├── HomePage.tsx
    │   ├── NotFoundPage.tsx
    │   ├── EventsPage.tsx
    │   └── ResourcesPage.tsx
    └── utils
        ├── .gitkeep
        └── routes.ts
```

## Why i18n Stays

Internationalization is the one intentional extra layer in this repo.

It stays because it maps directly to site content requirements rather than developer preference. If the organization needs English and Hawaiian content, the i18n setup earns its place.

If that requirement ever goes away, this is one of the first layers that should be reconsidered.

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
