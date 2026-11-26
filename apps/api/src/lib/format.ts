export function nowIso() {
  return new Date().toISOString();
}

export function addDaysIso(iso: string, days: number) {
  return new Date(Date.parse(iso) + days * 86_400_000).toISOString();
}

export function toTime(iso: string) {
  return Date.parse(iso);
}

export function toDate(iso: string) {
  return new Date(iso);
}
