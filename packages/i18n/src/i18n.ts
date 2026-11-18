export const locales = ["en", "th"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

type PluralMessage = Readonly<Partial<Record<Intl.LDMLPluralRule, string>> & { other: string }>;

type Message = string | PluralMessage;

export type Messages = Readonly<Record<string, Message>>;

export type Dictionary<M extends Messages> = Readonly<Record<Locale, { readonly [K in keyof M]: Message }>> & {
  readonly en: M;
};

type Placeholders<S extends string> = S extends `${string}{${infer P}}${infer R}` ? P | Placeholders<R> : never;

type Values<S extends string> = Readonly<Record<Exclude<Placeholders<S>, "count">, string | number>>;

type Args<M extends Message> = M extends PluralMessage
  ? [values: Values<M["other"]> & { readonly count: number }]
  : M extends string
    ? [Placeholders<M>] extends [never]
      ? []
      : [values: Values<M>]
    : never;

type Translate<M extends Messages> = <K extends keyof M & string>(key: K, ...args: Args<M[K]>) => string;

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

function isPlural(message: Message): message is PluralMessage {
  return message instanceof Object;
}

function interpolate(template: string, values: Readonly<Record<string, string | number>>) {
  return template.replaceAll(/\{(?<name>\w+)\}/gu, (match, name: string) => String(values[name] ?? match));
}

export function translator<const M extends Messages>(dictionary: Dictionary<M>, locale: Locale) {
  const messages = dictionary[locale];
  const rules = new Intl.PluralRules(locale);
  return ((key, ...args) => {
    const message = messages[key] ?? dictionary.en[key];
    const values: Readonly<Record<string, string | number>> = args[0] ?? {};
    if (message === undefined) return key;
    if (!isPlural(message)) return interpolate(message, values);
    return interpolate(message[rules.select(Number(values.count ?? 0))] ?? message.other, values);
  }) satisfies Translate<M>;
}
