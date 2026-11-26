import { describe, expect, test } from "vitest";

import { notesHref, parseNotesParams } from "#/features/notes/notes-params.ts";

const defaults = { q: undefined, sort: "-createdAt", cursor: [], from: undefined, to: undefined };

describe("parsing notes params", () => {
  test.each([
    { search: {}, expected: defaults },
    { search: { q: "  milk " }, expected: { ...defaults, q: "milk" } },
    { search: { q: "   " }, expected: defaults },
    { search: { sort: "title" }, expected: { ...defaults, sort: "title" } },
    { search: { sort: "price" }, expected: defaults },
    { search: { cursor: ["a1", "b2"] }, expected: { ...defaults, cursor: ["a1", "b2"] } },
    { search: { cursor: "a1" }, expected: { ...defaults, cursor: ["a1"] } },
    { search: { from: "2026-01-01", to: "tomorrow" }, expected: { ...defaults, from: "2026-01-01" } },
  ])("$search", ({ search, expected }) => {
    expect(parseNotesParams(search)).toStrictEqual(expected);
  });
});

describe("building notes links", () => {
  test.each([
    { params: { sort: "-createdAt", cursor: [] }, expected: "/notes" },
    { params: { q: "milk", sort: "title", cursor: [] }, expected: "/notes?q=milk&sort=title" },
    { params: { sort: "-createdAt", cursor: ["a1", "b2"] }, expected: "/notes?cursor=a1&cursor=b2" },
  ] as const)("$expected", ({ params, expected }) => {
    expect(notesHref(params)).toBe(expected);
  });
});
