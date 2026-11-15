import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArticleGrid, ArticleMeta } from "@/components/article-card";
import { BreakingNewsBanner } from "@/components/breaking-news-banner";
import { BannerSkeleton } from "@/components/skeletons";
import { SubscriptionStatus } from "@/components/subscription-status";
import { getFeaturedArticles } from "@/lib/api";
import { SITE_NAME } from "@/lib/format";

const description =
  "Today's top stories on web development, AI, security, design, and the developer community.";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME}: News for builders of the web` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/",
    title: `${SITE_NAME}: News for builders of the web`,
    description,
  },
};

export default async function HomePage() {
  // Cached ("use cache"), so the hero and grid are part of the static shell.
  const [topStory, ...rest] = await getFeaturedArticles(7);
  const featured = rest.slice(0, 6);

  return (
    <>
      <Suspense fallback={<BannerSkeleton />}>
        <BreakingNewsBanner />
      </Suspense>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pt-10 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12 lg:pt-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            The daily briefing
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            News for the people building the web.
          </h1>
          <p className="mt-4 max-w-lg text-lg text-muted">
            Sharp, independent reporting on frameworks, AI, security, and
            design, delivered fresh every day. Subscribe to read every story in
            full.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Reads the subscription cookie, so it streams in behind Suspense. */}
            <Suspense
              fallback={
                <span className="block h-11 w-44 animate-pulse rounded-full bg-surface" />
              }
            >
              <SubscriptionStatus variant="cta" />
            </Suspense>
            <Link
              href="/search"
              className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-semibold transition hover:bg-surface"
            >
              Browse articles
            </Link>
          </div>
        </div>

        {topStory ? (
          <article className="group relative overflow-hidden rounded-2xl bg-surface">
            <div className="relative aspect-[16/10]">
              <Image
                src={topStory.image.src}
                alt={topStory.image.alt}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                loading="eager"
                fetchPriority="high"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <span className="mb-2 inline-block rounded bg-white/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider backdrop-blur">
                Top story
              </span>
              <h2 className="text-xl font-semibold leading-snug tracking-tight text-balance sm:text-2xl">
                <Link
                  href={`/articles/${topStory.slug}`}
                  className="after:absolute after:inset-0 group-hover:underline group-hover:underline-offset-4"
                >
                  {topStory.title}
                </Link>
              </h2>
              <div className="mt-2 [&_p]:text-white/75 [&_span]:text-white/90">
                <ArticleMeta article={topStory} />
              </div>
            </div>
          </article>
        ) : null}
      </section>

      <section
        aria-labelledby="featured-heading"
        className="mx-auto max-w-6xl px-4 pt-16 sm:px-6"
      >
        <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-3">
          <h2
            id="featured-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Featured stories
          </h2>
          <Link
            href="/search"
            className="text-sm font-medium text-accent hover:underline"
          >
            View all →
          </Link>
        </div>
        <ArticleGrid articles={featured} />
      </section>
    </>
  );
}
