export function AppCardSkeleton() {
  return (
    <div className="glass-card p-5 rounded-2xl animate-pulse">
      <div className="mb-4 rounded-xl aspect-video bg-white/[0.05]" />
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 rounded-xl bg-white/[0.05] flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 rounded bg-white/[0.05]" />
          <div className="h-3 w-full rounded bg-white/[0.05]" />
          <div className="h-3 w-1/2 rounded bg-white/[0.05]" />
        </div>
      </div>
    </div>
  );
}
