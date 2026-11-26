import { defaultLocale } from "@repo/i18n";

const dateTime = new Intl.DateTimeFormat(defaultLocale, { dateStyle: "medium", timeStyle: "short" });

export function formatDateTime(iso: string) {
  return dateTime.format(Date.parse(iso));
}
