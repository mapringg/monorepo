import { describeRoute } from "hono-openapi";

import { factory } from "#/factory.ts";
import { createNote, deleteNote, getNote, listNotes, updateNote } from "#/features/notes/db.ts";
import {
  createNoteSchema,
  listNotesQuerySchema,
  noteIdSchema,
  noteListSchema,
  noteSchema,
  updateNoteSchema,
} from "#/features/notes/schema.ts";
import { ApiError } from "#/lib/errors.ts";
import { errorResponses, jsonResponse } from "#/lib/openapi.ts";
import { v } from "#/lib/validate.ts";

export const notesRoutes = factory
  .createApp()
  .get(
    "/",
    describeRoute({
      summary: "List notes",
      responses: { 200: jsonResponse("Notes", noteListSchema), 400: errorResponses[400], 401: errorResponses[401] },
    }),
    v("query", listNotesQuerySchema),
    async (c) => c.json(await listNotes(c.var.auth.user.id, c.req.valid("query")), 200),
  )
  .post(
    "/",
    describeRoute({
      summary: "Create a note",
      responses: { 201: jsonResponse("Created note", noteSchema), 400: errorResponses[400], 401: errorResponses[401] },
    }),
    v("json", createNoteSchema),
    async (c) => c.json(await createNote(c.var.auth.user.id, c.req.valid("json")), 201),
  )
  .get(
    "/:id",
    describeRoute({
      summary: "Get a note",
      responses: { 200: jsonResponse("Note", noteSchema), 401: errorResponses[401], 404: errorResponses[404] },
    }),
    v("param", noteIdSchema),
    async (c) => {
      const note = await getNote(c.var.auth.user.id, c.req.valid("param").id);
      if (note === null) throw new ApiError("not_found");
      return c.json(note, 200);
    },
  )
  .patch(
    "/:id",
    describeRoute({
      summary: "Update a note",
      responses: {
        200: jsonResponse("Updated note", noteSchema),
        400: errorResponses[400],
        401: errorResponses[401],
        404: errorResponses[404],
      },
    }),
    v("param", noteIdSchema),
    v("json", updateNoteSchema),
    async (c) => {
      const note = await updateNote(c.var.auth.user.id, c.req.valid("param").id, c.req.valid("json"));
      if (note === null) throw new ApiError("not_found");
      return c.json(note, 200);
    },
  )
  .delete(
    "/:id",
    describeRoute({
      summary: "Delete a note",
      responses: { 204: { description: "Deleted" }, 401: errorResponses[401], 404: errorResponses[404] },
    }),
    v("param", noteIdSchema),
    async (c) => {
      const deleted = await deleteNote(c.var.auth.user.id, c.req.valid("param").id);
      if (!deleted) throw new ApiError("not_found");
      return c.body(null, 204);
    },
  );

export type NotesRoutes = typeof notesRoutes;
