export type NotesSelection = { status: "browsing" } | { status: "selecting"; ids: readonly string[] };

export type NotesSelectionAction = { type: "start" } | { type: "toggle"; id: string } | { type: "clear" };

export const initialNotesSelection: NotesSelection = { status: "browsing" };

export function notesSelectionReducer(state: NotesSelection, action: NotesSelectionAction) {
  switch (action.type) {
    case "start": {
      return { status: "selecting", ids: [] } satisfies NotesSelection;
    }
    case "toggle": {
      if (state.status === "browsing") return state;
      const ids = state.ids.includes(action.id)
        ? state.ids.filter((id) => id !== action.id)
        : [...state.ids, action.id];
      return { status: "selecting", ids } satisfies NotesSelection;
    }
    case "clear": {
      return initialNotesSelection;
    }
    default: {
      const unreachable: never = action;
      return unreachable;
    }
  }
}
