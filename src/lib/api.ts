import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { articles, breakingNews, categories } from "@/lib/data/articles";
import type {
  Article,
  ArticleSummary,
  BreakingNews,
  Category,
} from "@/lib/types";

/**
 * Data-access layer for Vercel Daily.
 *
 * Every page and component reads news data through these functions, never
 * from the dataset directly. Today they read a local mock dataset (with a
 * small simulated network delay); pointing them at a real news API only
 * means changing the bodies below.
 *
 * Caching strategy (Cache Components):
 * - Catalog reads ("use cache" + cacheLife("hours")) are prerendered into
 *   the static shell and shared by every visitor.
 * - Breaking news uses a short "minutes" lifetime so the banner rotates.
 * - Trending is request-time (connection()), so it always streams in fresh
 *   behind a <Suspense> boundary.
 */

const SIMULATED_LATENCY_MS = 150;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toSummary({ body: _body, ...summary }: Article): ArticleSummary {
  return summary;
}

function byNewest(a: { publishedAt: string }, b: { publishedAt: string }) {
  return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
}

/** Display name for a category slug (falls back to the slug itself). */
export function getCategoryName(slug: string): string {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}

/** All categories, in display order. */
export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("days");
  cacheTag("categories");
  await delay(SIMULATED_LATENCY_MS);
  return categories;
}

/** Slugs for every article, used by generateStaticParams. */
export async function getArticleSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");
  return articles.map((article) => article.slug);
}

/** Featured articles, newest first. */
export async function getFeaturedArticles(
  limit = 7,
): Promise<ArticleSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");
  await delay(SIMULATED_LATENCY_MS);
  return articles
    .filter((article) => article.featured)
    .sort(byNewest)
    .slice(0, limit)
    .map(toSummary);
}

/** The most recently published articles. */
export async function getRecentArticles(limit = 6): Promise<ArticleSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");
  await delay(SIMULATED_LATENCY_MS);
  return [...articles].sort(byNewest).slice(0, limit).map(toSummary);
}

/** A single article with its full body, or null if the slug is unknown. */
export async function getArticle(slug: string): Promise<Article | null> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles", `article:${slug}`);
  await delay(SIMULATED_LATENCY_MS);
  return articles.find((article) => article.slug === slug) ?? null;
}

/**
 * Server-side search. Every whitespace-separated term must appear in the
 * article's title, excerpt, body, author, category, or tags (case-insensitive).
 * Each (query, category, limit) combination is cached separately.
 */
export async function searchArticles({
  query,
  category,
  limit = 5,
}: {
  query: string;
  category: string;
  limit?: number;
}): Promise<ArticleSummary[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("articles");
  await delay(SIMULATED_LATENCY_MS * 2);

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  return articles
    .filter((article) => !category || article.category === category)
    .filter((article) => {
      if (terms.length === 0) return true;
      const haystack = [
        article.title,
        article.excerpt,
        ...article.body,
        article.author.name,
        article.category,
        ...article.tags,
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((term) => haystack.includes(term));
    })
    .sort(byNewest)
    .slice(0, limit)
    .map(toSummary);
}

/**
 * The current breaking-news item. Cached for a few minutes, then a different
 * story rotates in when the entry revalidates.
 */
export async function getBreakingNews(): Promise<BreakingNews | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("breaking-news");
  await delay(SIMULATED_LATENCY_MS);
  if (breakingNews.length === 0) return null;
  const index = Math.floor(Date.now() / 60_000) % breakingNews.length;
  return breakingNews[index] ?? null;
}

/**
 * Trending articles, computed per request from simulated live view counts.
 * connection() opts out of prerendering, so this always runs at request time
 * and must be rendered behind a <Suspense> boundary.
 */
export async function getTrendingArticles({
  exclude,
  limit = 4,
}: {
  exclude?: string;
  limit?: number;
} = {}): Promise<ArticleSummary[]> {
  await connection();
  await delay(SIMULATED_LATENCY_MS * 4);

  return articles
    .filter((article) => article.slug !== exclude)
    .map((article) => ({
      article,
      // Recent stories get a head start; the random part simulates live traffic.
      views:
        1_000 / (1 + (Date.now() - Date.parse(article.publishedAt)) / 8.64e7) +
        Math.random() * 400,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, limit)
    .map(({ article }) => toSummary(article));
}
