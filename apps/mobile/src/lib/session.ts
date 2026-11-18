import { useSyncExternalStore } from "react";

let token: string | null = null;

const listeners = new Set<() => void>();

export function sessionToken() {
  return token;
}

export function setSessionToken(next: string | null) {
  token = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSignedIn() {
  return useSyncExternalStore(subscribe, () => token !== null);
}
