import { z } from "zod";

const instantSchema = z.iso.datetime();

const daySchema = z.iso.date();

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  createdAt: instantSchema,
  updatedAt: instantSchema,
});

export type Note = z.infer<typeof noteSchema>;

export const noteListSchema = z.object({
  items: z.array(noteSchema),
  nextCursor: z.string().nullable(),
});

export type NoteList = z.infer<typeof noteListSchema>;

const noteSortFields = ["createdAt", "updatedAt", "title"] as const;

const sortFieldSchema = z.enum(noteSortFields);

const sortKeySchema = z.templateLiteral([z.enum(["", "-"]), sortFieldSchema]).transform((key) => ({
  field: sortFieldSchema.parse(key.replace(/^-/u, "")),
  direction: key.startsWith("-") ? -1 : 1,
}));

export type NoteSort = z.infer<typeof sortKeySchema>;

const maxNoteLimit = 100;

export const listNotesQuerySchema = z.object({
  q: z.string().trim().min(1).optional(),
  sort: z
    .string()
    .default("-createdAt")
    .transform((value) => value.split(","))
    .pipe(z.array(sortKeySchema).min(1)),
  cursor: z.string().min(1).optional(),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .default(20)
    .transform((value) => Math.min(value, maxNoteLimit)),
  from: daySchema.optional(),
  to: daySchema.optional(),
});

export type ListNotesQuery = z.infer<typeof listNotesQuerySchema>;

export const noteIdSchema = z.object({ id: z.string().min(1) });

const titleSchema = z.string().trim().min(1).max(200);

const bodySchema = z.string().max(10_000);

export const createNoteSchema = z.object({
  title: titleSchema,
  body: bodySchema.default(""),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;

export const updateNoteSchema = z.object({
  title: titleSchema.optional(),
  body: bodySchema.optional(),
});

export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
