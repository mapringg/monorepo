"use client";

import { ErrorPanel } from "#/components/boundary/error-panel.tsx";

export default function AppError({ retry }: { error: Error; retry: () => void }) {
  return <ErrorPanel retry={retry} />;
}
