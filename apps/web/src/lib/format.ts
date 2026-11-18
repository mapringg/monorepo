import { defaultLocale } from "@repo/i18n";

export function nowIso() {
  return new Date().toISOString();
}

const dateTime = new Intl.DateTimeFormat(defaultLocale, { dateStyle: "medium", timeStyle: "short" });

export function formatDateTime(iso: string) {
  return dateTime.format(Date.parse(iso));
}
