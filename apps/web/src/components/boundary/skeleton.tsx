export function Skeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div aria-busy="true" className="flex flex-col gap-2">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="rounded-card bg-muted h-12 animate-pulse" />
      ))}
    </div>
  );
}
