# api

Hono 4 on Node. Routes live under `/api`; the notes and sessions features show the full pattern.

```sh
pnpm dev
pnpm test
pnpm build && pnpm start
```

`pnpm build` writes `dist/server.mjs` and the precompiled client types `dist/client.d.ts` that the UI apps import as `api/client`. Rebuild after changing routes so the UI apps see the new types.

| Variable          | Default                                       |
| ----------------- | --------------------------------------------- |
| `NODE_ENV`        | `production`                                  |
| `PORT`            | `8787`                                        |
| `ALLOWED_ORIGINS` | `http://localhost:3000,http://localhost:5173` |
| `LINE_CHANNEL_ID` | empty                                         |
