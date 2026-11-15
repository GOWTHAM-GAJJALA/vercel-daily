import Link from "next/link";
import { getBreakingNews } from "@/lib/api";

/**
 * Breaking-news banner. getBreakingNews() is cached with a short "minutes"
 * lifetime, so the banner refreshes in the background and rotates stories
 * without making the rest of the homepage dynamic.
 */
export async function BreakingNewsBanner() {
  const news = await getBreakingNews();
  if (!news) return null;

  return (
    <section
      aria-label="Breaking news"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded bg-red-600 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
          <span
            aria-hidden="true"
            className="size-1.5 animate-pulse rounded-full bg-white"
          />
          Breaking
        </span>
        <Link
          href={`/articles/${news.articleSlug}`}
          className="truncate text-sm font-medium hover:underline hover:underline-offset-4"
        >
          {news.headline}
        </Link>
      </div>
    </section>
  );
}
