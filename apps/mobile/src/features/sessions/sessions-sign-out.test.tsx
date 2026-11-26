import { afterAll, beforeAll, expect, test } from "@jest/globals";
import { render, screen, userEvent } from "@testing-library/react-native";
import { HttpResponse, http } from "msw";
import { setupServer } from "msw/native";

import { SessionsSignInForm } from "#/features/sessions/sessions-sign-in-form.tsx";
import { SessionsSignOut } from "#/features/sessions/sessions-sign-out.tsx";
import { client } from "#/lib/api/client.ts";
import { QueryClientProvider, queryClient } from "#/lib/query.ts";
import { useSignedIn } from "#/lib/session.ts";

const api = "http://localhost:8787/api";
const liveTokens = new Set<string>();

function bearer(request: Request) {
  return request.headers.get("authorization")?.replace("Bearer ", "") ?? "";
}

function unauthenticated() {
  return HttpResponse.json({ code: "unauthenticated" }, { status: 401 });
}

const server = setupServer(
  http.post(`${api}/sessions`, () => {
    liveTokens.add("t1");
    return HttpResponse.json(
      { token: "t1", expiresAt: "2026-12-01T00:00:00.000Z", user: { id: "demo:ada", name: "Ada" } },
      { status: 201 },
    );
  }),
  http.delete(`${api}/sessions/current`, ({ request }) =>
    liveTokens.delete(bearer(request)) ? new HttpResponse(null, { status: 204 }) : unauthenticated(),
  ),
  http.get(`${api}/sessions/current`, ({ request }) =>
    liveTokens.has(bearer(request)) ? HttpResponse.json({ user: { id: "demo:ada", name: "Ada" } }) : unauthenticated(),
  ),
);

beforeAll(() => {
  const defaults = queryClient.getDefaultOptions();
  queryClient.setDefaultOptions({ ...defaults, mutations: { ...defaults.mutations, gcTime: Infinity } });
  server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => {
  server.close();
});

function SessionScreen() {
  return useSignedIn() ? <SessionsSignOut /> : <SessionsSignInForm />;
}

test("signing out returns to the sign-in form and revokes the session", async () => {
  const user = userEvent.setup();
  await render(
    <QueryClientProvider client={queryClient}>
      <SessionScreen />
    </QueryClientProvider>,
  );
  await user.type(screen.getByLabelText("Your name"), "Ada");
  await user.press(screen.getByRole("button", { name: "Continue" }));
  await user.press(await screen.findByRole("button", { name: "Sign out" }));
  await expect(screen.findByLabelText("Your name")).resolves.toBeDefined();
  expect(liveTokens.size).toBe(0);
  const current = await client.api.sessions.current.$get();
  expect(current.status).toBe(401);
});
