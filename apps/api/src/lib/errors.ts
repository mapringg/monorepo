import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { z } from "zod";

import { t } from "#/lib/i18n.ts";
import { log } from "#/lib/log.ts";

const errorStatus = {
  invalid_request: 400,
  unauthenticated: 401,
  forbidden: 403,
  not_found: 404,
  conflict: 409,
  rate_limited: 429,
  internal: 500,
  upstream_error: 502,
  unavailable: 503,
  upstream_timeout: 504,
} as const satisfies Record<string, ContentfulStatusCode>;

export type ErrorCode = keyof typeof errorStatus;

const errorCodes = Object.keys(errorStatus).filter((key): key is ErrorCode => Object.hasOwn(errorStatus, key));

const issueSchema = z.object({ path: z.string(), message: z.string() });

export type Issue = z.infer<typeof issueSchema>;

export const errorSchema = z.object({
  error: z.object({
    code: z.enum(errorCodes),
    message: z.string(),
    issues: z.array(issueSchema).optional(),
    requestId: z.string(),
  }),
});

export class ApiError extends HTTPException {
  readonly code: ErrorCode;
  readonly issues: readonly Issue[] | undefined;

  constructor(code: ErrorCode, options: { issues?: readonly Issue[]; cause?: unknown } = {}) {
    super(errorStatus[code], { message: t(`errors.${code}`), cause: options.cause });
    this.code = code;
    this.issues = options.issues;
  }
}

function codeForStatus(status: number) {
  return errorCodes.find((code) => errorStatus[code] === status) ?? "internal";
}

function toApiError(error: Error) {
  if (error instanceof ApiError) return error;
  if (error instanceof HTTPException) return new ApiError(codeForStatus(error.status), { cause: error });
  return new ApiError("internal", { cause: error });
}

export function onError(error: Error, c: Context) {
  const apiError = toApiError(error);
  const requestId = c.get("requestId");
  if (apiError.code === "internal") log.error(error.message, { requestId, stack: error.stack });
  const issues = apiError.issues === undefined ? {} : { issues: apiError.issues };
  return c.json(
    { error: { code: apiError.code, message: apiError.message, ...issues, requestId } },
    errorStatus[apiError.code],
  );
}

export function onNotFound(c: Context) {
  return onError(new ApiError("not_found"), c);
}
