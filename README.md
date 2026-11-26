# monorepo

The template every project starts from. It follows `@mapringg/standard` exactly; copy it, rename the apps' project values, and delete what you do not need.

## Layout

| Path              | What it is                                                        |
| ----------------- | ----------------------------------------------------------------- |
| `apps/api`        | Hono API on Node: sessions and notes, OpenAPI docs in development |
| `apps/web`        | Next.js app: notes list, editor and sign-in                       |
| `apps/liff`       | Vite LINE Front-end Framework app: notes list and create          |
| `apps/mobile`     | Expo app: notes list and create                                   |
| `apps/marketing`  | Astro site: one home page in English and Thai                     |
| `packages/tokens` | Design tokens as Tailwind theme CSS and `tokens.ts`               |
| `packages/i18n`   | Typed `t()` with plural rules, no provider                        |

## Start

```sh
mise install
pnpm install
pnpm --filter api dev
pnpm --filter web dev
```

Open `http://localhost:3000`, sign in with any name and add a note. The API docs are at `http://localhost:8787/api/docs` while `NODE_ENV` is `development`.

## Checks

| Command                         | What it runs                                                          |
| ------------------------------- | --------------------------------------------------------------------- |
| `pnpm lint`                     | oxlint with the standard config, type-aware, with the tsrs type check |
| `pnpm format`                   | oxfmt with the standard config                                        |
| `pnpm knip`                     | unused files, exports and dependencies                                |
| `pnpm test`                     | every package's unit tests                                            |
| `pnpm --filter marketing check` | `astro check`                                                         |
| `pnpm --filter web test:e2e`    | the notes journey in Chromium against built apps                      |

`pnpm install` points git at `.githooks`, whose `pre-push` runs the checks and the tests that the push affects, compared with `origin/develop` or, without a develop branch, `origin/main`.

## CI and deploys

- `.github/workflows/ci.yml` runs the pre-push hook on pull requests, and every check, test and keeper journey on pushes to `develop` or `main`.
- `.github/workflows/deploy.yml` is the reusable deploy, called with an `environment` input. `deploy-production.yml` calls it on pushes to `main`; add a `deploy-<env>.yml` per environment and replace the placeholder steps with the real target.

## Skills

See [AGENTS.md](AGENTS.md#sources) for the shared workflows.
