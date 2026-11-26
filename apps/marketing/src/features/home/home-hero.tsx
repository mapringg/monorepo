import type { Locale } from "@repo/i18n";

import { tFor } from "#/lib/i18n.ts";

export function HomeHero({ locale, appUrl }: { locale: Locale; appUrl: string }) {
  const t = tFor(locale);
  const otherLocale = locale === "en" ? "th" : "en";
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start gap-6 px-6 py-24">
      <a href={`/${otherLocale}/`} className="text-muted-foreground text-sm">
        {t("home.otherLocale")}
      </a>
      <h1 className="text-4xl font-semibold">{t("home.title")}</h1>
      <p className="text-muted-foreground text-lg">{t("home.lead")}</p>
      <a href={appUrl} className="rounded-control bg-primary text-primary-foreground px-5 py-3 font-medium">
        {t("home.cta")}
      </a>
    </section>
  );
}
