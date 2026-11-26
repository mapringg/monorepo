import { defaultLocale, translator } from "@repo/i18n";

import { commonMessages } from "#/lib/i18n/messages/common.ts";
import { notesMessages } from "#/lib/i18n/messages/notes.ts";

const messages = {
  en: { ...commonMessages.en, ...notesMessages.en },
  th: { ...commonMessages.th, ...notesMessages.th },
};

export const t = translator(messages, defaultLocale);
