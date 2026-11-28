# AGENTS.md

## Rules

- Only the API touches storage and other services, and every call to another service has a timeout.
- Public routes are listed in one place. Adding one is a security decision, so say why in the PR.
- Keep handlers short and give every JSON response an explicit status.

- Rebuild the API after changing routes so its UI clients see the new types.
