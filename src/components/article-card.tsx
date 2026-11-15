import Image from "next/image";
import Link from "next/link";
import { getCategoryName } from "@/lib/api";
import { formatDate } from "@/lib/format";
import type { ArticleSummary } from "@/lib/types";

export function ArticleMeta({ article }: { article: ArticleSummary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 text-xs font-medium uppercase tracking-wide text-muted">
      <span className="text-accent">{getCategoryName(article.category)}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={article.publishedAt}>
        {formatDate(article.publishedAt)}
      </time>
    </p>
  );
}

export function ArticleCard({
  article,
  showExcerpt = true,
}: {
  article: ArticleSummary;
  showExcerpt?: boolean;
}) {
  return (
    <article className="group relative flex flex-col gap-3">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface">
        <Image
          src={article.image.src}
          alt={article.image.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <ArticleMeta article={article} />
      <h3 className="text-lg font-semibold leading-snug tracking-tight">
        <Link
          href={`/articles/${article.slug}`}
          className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4"
        >
          {article.title}
        </Link>
      </h3>
      {showExcerpt ? (
        <p className="line-clamp-2 text-sm text-muted">{article.excerpt}</p>
      ) : null}
    </article>
  );
}

export function ArticleGrid({ articles }: { articles: ArticleSummary[] }) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
