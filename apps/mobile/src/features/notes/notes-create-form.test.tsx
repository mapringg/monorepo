import { afterAll, afterEach, beforeAll, beforeEach, expect, jest, test } from "@jest/globals";
import { render, screen, userEvent } from "@testing-library/react-native";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/native";

import { NotesCreateForm } from "#/features/notes/notes-create-form.tsx";
import { QueryClientProvider, queryClient } from "#/lib/query.ts";

const created = {
  id: "n1",
  title: "Buy milk",
  body: "",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

const received: unknown[] = [];

const server = setupServer(
  http.post("http://localhost:8787/api/notes", async ({ request }) => {
    received.push(await request.json());
    return HttpResponse.json(created, { status: 201 });
  }),
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "error" });
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  queryClient.clear();
  server.resetHandlers();
  received.length = 0;
  jest.useRealTimers();
});

afterAll(() => {
  server.close();
});

test("submits the typed title to the notes API", async () => {
  const user = userEvent.setup({ advanceTimers: (ms) => jest.advanceTimersByTime(ms) });
  await render(
    <QueryClientProvider client={queryClient}>
      <NotesCreateForm />
    </QueryClientProvider>,
  );
  await user.type(screen.getByLabelText("Title"), "Buy milk");
  await user.press(screen.getByRole("button", { name: "Add note" }));
  await jest.runAllTimersAsync();
  expect(received).toStrictEqual([{ title: "Buy milk", body: "" }]);
});
