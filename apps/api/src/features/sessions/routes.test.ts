import { testClient } from "hono/testing";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { app } from "#/app.ts";
import { createdSessionSchema, sessionSchema } from "#/features/sessions/schema.ts";
import { errorSchema } from "#/lib/errors.ts";

const client = testClient(app);

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime("2026-01-01T00:00:00Z");
});

describe("sessions routes", () => {
  test("signs in, reads the current session, and signs out", async () => {
    const created = await client.api.sessions.$post({ json: { provider: "demo", name: "Ada" } });
    expect(created.status).toBe(201);
    const { token } = createdSessionSchema.parse(await created.json());
    const ada = testClient(app, undefined, undefined, { headers: { authorization: `Bearer ${token}` } });
    const currentResponse = await ada.api.sessions.current.$get();
    const current = sessionSchema.parse(await currentResponse.json());
    expect(current).toStrictEqual({ user: { id: "demo:ada", name: "Ada" }, expiresAt: "2026-01-31T00:00:00.000Z" });
    const signedOut = await ada.api.sessions.current.$delete();
    const afterSignOut = await ada.api.sessions.current.$get();
    expect([signedOut.status, afterSignOut.status]).toStrictEqual([204, 401]);
  });

  test("rejects a blank name", async () => {
    const response = await client.api.sessions.$post({ json: { provider: "demo", name: "   " } });
    expect(response.status).toBe(400);
    expect(errorSchema.parse(await response.json()).error.code).toBe("invalid_request");
  });

  test("refuses the current session without a token", async () => {
    const response = await client.api.sessions.current.$get();
    expect(response.status).toBe(401);
  });
});
