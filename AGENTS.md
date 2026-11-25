# Monorepo

Follow `@mapringg/standard`; `pnpm lint` enforces it. Read the `AGENTS.md` of every app you change.

## Rules

- Pin shared dependencies once, in the workspace catalog.
- Send every string a user reads through `t()`.
- Run `pnpm lint`, `pnpm knip` and `pnpm test` before pushing.

## Sources

- Follow the standard's [test audit](node_modules/@mapringg/standard/.claude/skills/test-audit/SKILL.md) before a migration or broad refactor.
- Follow the standard's [review workflow](node_modules/@mapringg/standard/.claude/skills/review-standard/SKILL.md) when reviewing a diff.
- Follow the standard's [PR writing skill](node_modules/@mapringg/standard/.claude/skills/pr/SKILL.md) when writing a pull request.
- Follow the standard's [upgrade skill](node_modules/@mapringg/standard/.claude/skills/upgrade-standard/SKILL.md) when upgrading @mapringg/standard.
