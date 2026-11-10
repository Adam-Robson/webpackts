# typescript-webpack-template

A minimal starter for React + TypeScript on webpack 5, with few dependencies.

- **React 19** with **react-router 8** (Data Mode)
- **TypeScript 7**: `tsc` only type-checks, and **SWC** transpiles
- **webpack 5** with Fast Refresh, CSS Modules, hashed output and source maps
- **Vitest** + Testing Library for tests
- **Biome** for linting and formatting
- Self-hosted fonts and native `.env` support, with no `dotenv`

## Requirements

- Node **22.22+** (24 recommended; see `.nvmrc`)
- npm 11+

## Getting started

```sh
nvm use
npm install
npm run dev        # http://localhost:7890
```

## Scripts

| Script              | What it does                                       |
| ------------------- | -------------------------------------------------- |
| `npm run dev`       | Dev server with Fast Refresh on port 7890          |
| `npm run build`     | Type-check, then production build into `dist/`     |
| `npm run typecheck` | `tsc --noEmit`                                     |
| `npm test`          | Vitest in watch mode                               |
| `npm run check`     | Biome lint + format, applying fixes                |
| `npm run ci`        | Biome (no writes) + type-check + tests, as CI runs |

## Project layout

```text
public/
  index.html          HTML template (scripts and styles are injected)
  microsoft.svg       Favicon
src/
  index.tsx           Entry: creates the router and renders the app
  routes.tsx          Route tree
  components/         Shared components (Layout, …)
  pages/              One component per route
  styles/fonts.css    @font-face declarations
  assets/fonts/       Self-hosted woff2 files + licenses
  global.d.ts         Types for CSS Modules, assets and env vars
__tests__/            Vitest tests
webpack.config.ts     Build config (loaded natively by Node, no tsx)
vitest.config.ts      Test config
```

## Adding a route

1. Create a component in `src/pages/`.
2. Add it to the `children` array in `src/routes.tsx`.
3. Link to it with `<Link to="/path">` from `react-router`.

## Path aliases

Aliases are defined **only** in `tsconfig.json` under `compilerOptions.paths`. webpack (`resolve.tsconfig`) and Vitest (`resolve.tsconfigPaths`) both read them from there, so adding one means editing a single file.

| Alias       | Points to          |
| ----------- | ------------------ |
| `@/*`       | `src/*`            |
| `@assets/*` | `src/assets/*`     |
| `@comps/*`  | `src/components/*` |
| `@pages/*`  | `src/pages/*`      |
| `@utils/*`  | `src/utils/*`      |

## Styling

- Global styles live in `src/index.css`. Theme tokens are CSS custom properties, and light and dark mode come from `light-dark()`.
- Files named `*.module.css` are CSS Modules: `import styles from './X.module.css'`.
- In development, CSS is injected by `style-loader`. Production builds extract it into hashed `.css` files.

## Fonts

Barlow (body) and Saira (headings, variable) are self-hosted from `src/assets/fonts/`, so there are no third-party requests. They're bundled with content hashes and use `font-display: swap`. Both are licensed under the SIL Open Font License; see the `OFL-*.txt` files.

To change fonts:

1. Drop the `.woff2` files into `src/assets/fonts/`.
2. Update `src/styles/fonts.css`.
3. Update the `--font-*` tokens in `src/index.css`.

## Environment variables

Copy `.env.example` to `.env`. The webpack config loads it with Node's built-in `process.loadEnvFile()`. Only variables prefixed with **`PUBLIC_`** are inlined into the browser bundle, so anything else (secrets) never ships. Add types for new variables in `src/global.d.ts`.

## API proxy

In development, requests to `/api/*` are proxied to `http://localhost:7891` with the `/api` prefix stripped. Change this under `devServer.proxy` in `webpack.config.ts`.

## Type checking

SWC strips types without checking them. Type errors are caught by:

- your editor, as you type
- `npm run build`, which runs `tsc --noEmit` before bundling
- `npm run ci` and GitHub Actions
