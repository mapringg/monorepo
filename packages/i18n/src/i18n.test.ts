import { translator } from "@repo/i18n";
import { describe, expect, test } from "vitest";

const dictionary = {
  en: {
    greeting: "Hello, {name}",
    notes: { one: "{count} note", other: "{count} notes" },
    title: "Notes",
  },
  th: {
    greeting: "สวัสดี {name}",
    notes: { other: "โน้ต {count} รายการ" },
    title: "โน้ต",
  },
} as const;

const en = translator(dictionary, "en");

const th = translator(dictionary, "th");

describe("translating messages", () => {
  test.each([
    { actual: en("title"), expected: "Notes" },
    { actual: en("greeting", { name: "Ada" }), expected: "Hello, Ada" },
    { actual: en("notes", { count: 1 }), expected: "1 note" },
    { actual: en("notes", { count: 3 }), expected: "3 notes" },
    { actual: th("notes", { count: 1 }), expected: "โน้ต 1 รายการ" },
    { actual: th("greeting", { name: "Ada" }), expected: "สวัสดี Ada" },
  ])("$expected", ({ actual, expected }) => {
    expect(actual).toBe(expected);
  });
});
