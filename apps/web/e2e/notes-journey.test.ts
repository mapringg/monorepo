import type { APIRequestContext, Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

async function signIn(page: Page, name: string) {
  await page.goto("/notes");
  await expect(page).toHaveURL(/\/signin$/u);
  await page.getByRole("textbox", { name: "Your name" }).fill(name);
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByRole("heading", { name: "Your notes" })).toBeVisible();
}

async function addNote(page: Page, title: string) {
  await page.getByRole("textbox", { name: "Title" }).fill(title);
  await page.getByRole("button", { name: "Add note" }).click();
  await expect(page.getByRole("list").first().getByRole("link", { name: title })).toBeVisible();
}

async function openFromSearch(page: Page, query: string, title: string) {
  await page.getByRole("searchbox", { name: "Search" }).fill(query);
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page).toHaveURL(new RegExp(`q=${query}`, "u"));
  await page.getByRole("list").first().getByRole("link", { name: title }).click();
  await expect(page).toHaveURL(/\/notes\/[^/?]+$/u);
}

async function rename(page: Page, title: string) {
  await page.getByRole("textbox", { name: "Title" }).fill(title);
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Saved.")).toBeVisible();
}

async function deleteOpenNote(page: Page) {
  await page.getByRole("button", { name: "Delete" }).click();
  await page.getByRole("alertdialog").getByRole("button", { name: "Delete" }).click();
  await expect(page).toHaveURL(/\/notes$/u);
  await expect(page.getByText("No notes yet.")).toBeVisible();
}

async function signOut(page: Page, request: APIRequestContext) {
  const cookies = await page.context().cookies();
  const token = cookies.find((cookie) => cookie.name === "session")?.value ?? "";
  const currentSessionStatus = async () => {
    const response = await request.get("http://localhost:8787/api/sessions/current", {
      headers: { authorization: `Bearer ${token}` },
    });
    return response.status();
  };
  expect(await currentSessionStatus()).toBe(200);
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/signin$/u);
  await expect(page.getByRole("textbox", { name: "Your name" })).toBeVisible();
  expect(await currentSessionStatus()).toBe(401);
  await page.goto("/notes");
  await expect(page).toHaveURL(/\/signin$/u);
}

test("a signed-in user creates a note, finds it, edits it, deletes it and signs out", async ({ page, request }) => {
  await signIn(page, `journey-${crypto.randomUUID().slice(0, 8)}`);
  await addNote(page, "Buy oat milk");
  await openFromSearch(page, "oat", "Buy oat milk");
  await rename(page, "Buy oat milk and bread");
  await deleteOpenNote(page);
  await signOut(page, request);
});
