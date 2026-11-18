import { createClient } from "api/client";

export const browserClient = createClient("/");

export { DetailedError, parseResponse as read } from "hono/client";
