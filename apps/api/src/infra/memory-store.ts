export function createMemoryStore<T>() {
  const rows = new Map<string, T>();
  return {
    get: (id: string) => rows.get(id),
    set: (id: string, value: T) => {
      rows.set(id, value);
      return value;
    },
    delete: (id: string) => rows.delete(id),
    values: () => [...rows.values()],
  };
}

export function createId(bytes = 6) {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(bytes))).toString("base64url");
}
