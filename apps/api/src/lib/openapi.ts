import type { StandardSchemaV1 } from "@standard-schema/spec";
import { resolver } from "hono-openapi";

import { errorSchema } from "#/lib/errors.ts";

export function jsonResponse(description: string, schema: StandardSchemaV1) {
  return { description, content: { "application/json": { schema: resolver(schema) } } };
}

export const errorResponses = {
  400: jsonResponse("Invalid request", errorSchema),
  401: jsonResponse("Not signed in", errorSchema),
  404: jsonResponse("Not found", errorSchema),
};
