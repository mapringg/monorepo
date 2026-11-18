export type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; fieldErrors?: Readonly<Record<string, readonly string[]>> };

export type ActionState<T> = ActionResult<T> | null;
