import { hc } from "hono/client";

import type { AppType } from "#/app.ts";

export type { Note, NoteList } from "#/features/notes/schema.ts";
export type { Session } from "#/features/sessions/schema.ts";

export type Client = ReturnType<typeof hc<AppType>>;

export const createClient: (...args: Parameters<typeof hc>) => Client = (...args) => hc<AppType>(...args);
