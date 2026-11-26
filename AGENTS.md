# Monorepo

Follow `@mapringg/standard`; `pnpm lint` enforces it. Read the `AGENTS.md` of every app you change.

## Rules

- Pin shared dependencies once, in the workspace catalog.
- Send every string a user reads through `t()`.
- Run `pnpm lint`, `pnpm knip` and `pnpm test` before pushing.

## Sources

- Use [PR writing](node_modules/@mapringg/standard/.claude/skills/pr/SKILL.md) when writing a pull request.
- Follow [Capture](node_modules/@mapringg/standard/.claude/skills/capture/SKILL.md) when preparing pull request evidence.
