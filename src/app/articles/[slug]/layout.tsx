import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TrendingSkeleton } from "@/components/skeletons";
import { TrendingArticles } from "@/components/trending-articles";
import { getArticle, getArticleSlugs, getCategoryName } from "@/lib/api";
import { formatDate } from "@/lib/format";

/**
 * Prerender every known article. With Cache Components this must return at
 * least one param. Unknown slugs still render on demand (and 404 below).
 * Child routes (page.tsx and preview/page.tsx) inherit these params.
 */
export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Shared by the full article (page.tsx) and the paywalled preview
 * (preview/page.tsx): headline, byline, featured image, and trending.
 * {children} is the full body or the teaser + paywall.
 */
export default async function ArticleLayout({
  children,
  params,
}: LayoutProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <article className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 lg:pt-14">
        <header>
          <p className="text-xs font-semibold uppercase tracking-widest">
            <Link
              href={`/search?category=${article.category}`}
              className="text-accent hover:underline"
            >
              {getCategoryName(article.category)}
            </Link>
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{article.excerpt}</p>
          <div className="mt-6 flex items-center gap-3 border-y border-border py-4 text-sm">
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full bg-surface font-semibold"
            >
              {article.author.name.charAt(0)}
            </span>
            <div>
              <p className="font-semibold">{article.author.name}</p>
              <p className="text-muted">
                {article.author.role} ·{" "}
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
              </p>
            </div>
          </div>
        </header>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-surface sm:-mx-6 lg:-mx-16">
          <Image
            src={article.image.src}
            alt={article.image.alt}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </div>

        <div className="mt-10">{children}</div>
      </article>

      <section
        aria-labelledby="trending-heading"
        className="mx-auto mt-16 max-w-6xl px-4 sm:px-6"
      >
        <h2
          id="trending-heading"
          className="mb-6 border-b border-border pb-3 text-xl font-semibold tracking-tight"
        >
          Trending now
        </h2>
        {/* Request-time data (connection()), streamed in after the shell. */}
        <Suspense fallback={<TrendingSkeleton />}>
          <TrendingArticles exclude={article.slug} />
        </Suspense>
      </section>
    </>
  );
}
