import { describe, expect, test } from "vitest";

import type { NotesSelection, NotesSelectionAction } from "#/features/notes/notes-state.ts";
import { notesSelectionReducer } from "#/features/notes/notes-state.ts";

const cases: readonly { state: NotesSelection; action: NotesSelectionAction; expected: NotesSelection }[] = [
  { state: { status: "browsing" }, action: { type: "start" }, expected: { status: "selecting", ids: [] } },
  { state: { status: "browsing" }, action: { type: "toggle", id: "a" }, expected: { status: "browsing" } },
  {
    state: { status: "selecting", ids: [] },
    action: { type: "toggle", id: "a" },
    expected: { status: "selecting", ids: ["a"] },
  },
  {
    state: { status: "selecting", ids: ["a", "b"] },
    action: { type: "toggle", id: "a" },
    expected: { status: "selecting", ids: ["b"] },
  },
  { state: { status: "selecting", ids: ["a"] }, action: { type: "clear" }, expected: { status: "browsing" } },
];

describe("notes selection", () => {
  test.each(cases)("$action.type from $state.status", ({ state, action, expected }) => {
    expect(notesSelectionReducer(state, action)).toStrictEqual(expected);
  });
});
