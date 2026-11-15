/** Loading placeholders used as <Suspense> fallbacks. */

/** Stable keys for a fixed number of identical placeholder slots. */
const slotKeys = (count: number) =>
  Array.from({ length: count }, (_, i) => `slot-${i}`);

export function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <div className="aspect-[16/9] animate-pulse rounded-xl bg-surface" />
      <div className="h-3 w-24 animate-pulse rounded bg-surface" />
      <div className="h-5 w-full animate-pulse rounded bg-surface" />
      <div className="h-5 w-2/3 animate-pulse rounded bg-surface" />
    </div>
  );
}

export function ArticleGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <output
      aria-label="Loading articles"
      className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
    >
      {slotKeys(count).map((key) => (
        <ArticleCardSkeleton key={key} />
      ))}
    </output>
  );
}

export function TrendingSkeleton() {
  return (
    <output aria-label="Loading trending articles" className="block">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {slotKeys(4).map((key) => (
          <li key={key} className="flex gap-3" aria-hidden="true">
            <div className="size-16 shrink-0 animate-pulse rounded-lg bg-surface" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="h-3 w-16 animate-pulse rounded bg-surface" />
              <div className="h-4 w-full animate-pulse rounded bg-surface" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-surface" />
            </div>
          </li>
        ))}
      </ol>
    </output>
  );
}

export function BannerSkeleton() {
  return (
    <div className="border-b border-border bg-surface" aria-hidden="true">
      <div className="mx-auto flex h-10 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <div className="h-5 w-20 animate-pulse rounded bg-border" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-border" />
      </div>
    </div>
  );
}
