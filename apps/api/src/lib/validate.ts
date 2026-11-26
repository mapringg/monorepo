import type { StandardSchemaV1 } from "@standard-schema/spec";
import type { ValidationTargets } from "hono";
import { validator } from "hono-openapi";

import { ApiError } from "#/lib/errors.ts";

function issuePath(issue: StandardSchemaV1.Issue) {
  return (issue.path ?? []).map((part) => String(part instanceof Object ? part.key : part)).join(".");
}

export function v<Target extends keyof ValidationTargets, Schema extends StandardSchemaV1>(
  target: Target,
  schema: Schema,
) {
  return validator(target, schema, (result) => {
    if (!result.success) {
      throw new ApiError("invalid_request", {
        issues: result.error.map((issue) => ({ path: issuePath(issue), message: issue.message })),
      });
    }
  });
}
