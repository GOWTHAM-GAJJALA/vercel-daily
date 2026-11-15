import Image from "next/image";
import Link from "next/link";
import { getCategoryName, getTrendingArticles } from "@/lib/api";

/**
 * Trending articles, loaded at request time. getTrendingArticles() calls
 * connection(), so this component is excluded from the static shell and
 * streams in behind its <Suspense> boundary with fresh results per request.
 */
export async function TrendingArticles({ exclude }: { exclude?: string }) {
  const trending = await getTrendingArticles({ exclude, limit: 4 });

  return (
    <ol className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
      {trending.map((article, index) => (
        <li key={article.slug} className="group relative flex gap-3">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-surface">
            <Image
              src={article.image.src}
              alt=""
              fill
              sizes="64px"
              className="object-cover"
            />
            <span className="absolute left-1 top-1 rounded bg-black/70 px-1.5 text-[11px] font-bold text-white">
              {index + 1}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wide text-accent">
              {getCategoryName(article.category)}
            </p>
            <Link
              href={`/articles/${article.slug}`}
              className="line-clamp-3 text-sm font-semibold leading-snug after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4"
            >
              {article.title}
            </Link>
          </div>
        </li>
      ))}
    </ol>
  );
}
