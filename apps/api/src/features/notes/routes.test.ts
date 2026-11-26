import { testClient } from "hono/testing";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { app } from "#/app.ts";
import { noteListSchema, noteSchema } from "#/features/notes/schema.ts";
import { errorSchema } from "#/lib/errors.ts";

const client = testClient(app);

async function signIn(name: string) {
  const response = await client.api.sessions.$post({ json: { provider: "demo", name } });
  const { token } = await response.json();
  return testClient(app, undefined, undefined, { headers: { authorization: `Bearer ${token}` } });
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime("2026-01-01T00:00:00Z");
});

describe("notes routes", () => {
  test("creates a note and lists it", async () => {
    const ada = await signIn("ada-create");
    const created = await ada.api.notes.$post({ json: { title: "Groceries" } });
    expect(created.status).toBe(201);
    const note = noteSchema.parse(await created.json());
    const listResponse = await ada.api.notes.$get({ query: {} });
    const listed = noteListSchema.parse(await listResponse.json());
    expect(listed).toStrictEqual({ items: [note], nextCursor: null });
  });

  test("pages with a cursor", async () => {
    const ada = await signIn("ada-pages");
    await Promise.all(["a", "b", "c"].map(async (title) => ada.api.notes.$post({ json: { title } })));
    const firstPage = await ada.api.notes.$get({ query: { sort: "title", limit: "2" } });
    const first = noteListSchema.parse(await firstPage.json());
    const secondPage = await ada.api.notes.$get({ query: { sort: "title", cursor: String(first.nextCursor) } });
    const second = noteListSchema.parse(await secondPage.json());
    expect([first.items.map((n) => n.title), second.items.map((n) => n.title)]).toStrictEqual([["a", "b"], ["c"]]);
  });

  test("rejects an empty title", async () => {
    const ada = await signIn("ada-invalid");
    const response = await ada.api.notes.$post({ json: { title: " " } });
    expect(response.status).toBe(400);
    const { error } = errorSchema.parse(await response.json());
    expect([error.code, error.issues?.map((issue) => issue.path)]).toStrictEqual(["invalid_request", ["title"]]);
  });

  test("refuses requests without a session", async () => {
    const response = await client.api.notes.$get({ query: {} });
    expect(response.status).toBe(401);
    expect(errorSchema.parse(await response.json()).error.code).toBe("unauthenticated");
  });

  test("hides another user's note", async () => {
    const ada = await signIn("ada-owner");
    const bob = await signIn("bob-other");
    const created = await ada.api.notes.$post({ json: { title: "Private" } });
    const note = noteSchema.parse(await created.json());
    const response = await bob.api.notes[":id"].$patch({ param: { id: note.id }, json: { title: "Mine" } });
    expect(response.status).toBe(404);
  });
});
