# web

Next.js 16 with Cache Components, the React Compiler and typed routes. The browser reaches the API through the `/api/:path*` rewrite.

```sh
pnpm dev
pnpm test
pnpm test:e2e
```

| Variable                             | Default                             |
| ------------------------------------ | ----------------------------------- |
| `API_URL`                            | `http://localhost:8787`             |
| `WEB_ORIGIN`                         | `http://localhost:3000`             |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | set one stable value per deployment |
