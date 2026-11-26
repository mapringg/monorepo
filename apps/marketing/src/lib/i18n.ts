import type { Locale } from "@repo/i18n";
import { defaultLocale, isLocale, translator } from "@repo/i18n";

import { homeMessages } from "#/lib/i18n/messages/home.ts";

export function tFor(locale: Locale) {
  return translator(homeMessages, locale);
}

export function localeFrom(value: string | undefined) {
  return value !== undefined && isLocale(value) ? value : defaultLocale;
}
