import type { Metadata } from "next";
import { getArticle, getCategoryName } from "@/lib/api";
import { SITE_NAME } from "@/lib/format";

/**
 * Metadata for an article, shared by the full and preview routes.
 *
 * Both routes are served at the same public URL (/articles/<slug>; proxy.ts
 * rewrites non-subscribers to the preview), so both point their canonical
 * URL and Open Graph URL at /articles/<slug>.
 */
export async function getArticleMetadata(slug: string): Promise<Metadata> {
  const article = await getArticle(slug);
  if (!article) {
    return { title: "Article not found" };
  }

  const url = `/articles/${article.slug}`;
  const image = {
    url: article.image.src,
    width: 1600,
    height: 900,
    alt: article.image.alt,
  };

  return {
    title: article.title,
    description: article.excerpt,
    authors: [{ name: article.author.name }],
    keywords: article.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      url,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      section: getCategoryName(article.category),
      tags: article.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [image.url],
    },
  };
}
