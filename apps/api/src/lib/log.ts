import { nowIso } from "#/lib/format.ts";
import { stringifyJson } from "#/lib/json.ts";

type Level = "debug" | "info" | "warn" | "error";

type Fields = Readonly<Record<string, unknown>>;

function write(level: Level, message: string, fields: Fields) {
  const line = stringifyJson({ level, message, time: nowIso(), ...fields });
  if (level === "error" || level === "warn") console.error(line);
  else console.log(line);
}

export const log = {
  debug: (message: string, fields: Fields = {}) => write("debug", message, fields),
  info: (message: string, fields: Fields = {}) => write("info", message, fields),
  warn: (message: string, fields: Fields = {}) => write("warn", message, fields),
  error: (message: string, fields: Fields = {}) => write("error", message, fields),
};
