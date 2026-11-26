import { defaultLocale, translator } from "@repo/i18n";

import { errorsMessages } from "#/lib/i18n/messages/errors.ts";

export const t = translator(errorsMessages, defaultLocale);
