import { createFactory } from "hono/factory";

import type { SessionUser } from "#/features/sessions/schema.ts";

type Auth = {
  token: string;
  user: SessionUser;
};

export type AppEnv = {
  Variables: {
    requestId: string;
    auth: Auth;
  };
};

export const factory = createFactory<AppEnv>();
