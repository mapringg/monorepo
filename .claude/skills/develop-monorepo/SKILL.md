---
name: develop-monorepo
description: Build, verify, or deploy the monorepo template apps.
---

# Develop the monorepo

Use the relevant app reference to build or check that app.

- [API](api.md)
- [LIFF](liff.md)
- [Marketing](marketing.md)
- [Mobile](mobile.md)
- [Web](web.md)

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
