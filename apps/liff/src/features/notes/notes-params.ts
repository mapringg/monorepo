import { useSearch } from "@tanstack/react-router";
import * as z from "zod/mini";

const defaultSort = "-updatedAt";

export const notesParamsSchema = z.object({
  q: z.catch(z.optional(z.string().check(z.trim(), z.minLength(1), z.maxLength(200))), undefined),
  sort: z.catch(z._default(z.enum(["-updatedAt", "title"]), defaultSort), defaultSort),
});

export type NotesParams = z.infer<typeof notesParamsSchema>;

export function useNotesParams() {
  return useSearch({ from: "/" });
}
