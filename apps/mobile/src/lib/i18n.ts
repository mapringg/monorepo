import { defaultLocale, translator } from "@repo/i18n";

import { commonMessages } from "#/lib/i18n/messages/common.ts";
import { notesMessages } from "#/lib/i18n/messages/notes.ts";
import { sessionsMessages } from "#/lib/i18n/messages/sessions.ts";

const messages = {
  en: { ...commonMessages.en, ...notesMessages.en, ...sessionsMessages.en },
  th: { ...commonMessages.th, ...notesMessages.th, ...sessionsMessages.th },
};

export const t = translator(messages, defaultLocale);
