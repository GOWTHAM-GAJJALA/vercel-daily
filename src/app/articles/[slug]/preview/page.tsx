import { notFound } from "next/navigation";
import { Paywall } from "@/components/paywall";
import { getArticle } from "@/lib/api";
import { getArticleMetadata } from "@/lib/article-metadata";

/**
 * Paywalled version of an article. proxy.ts rewrites non-subscribers here
 * (the browser URL stays /articles/<slug>). Only the first paragraph is
 * rendered, so the rest of the body is never sent to the client.
 */
export async function generateMetadata({
  params,
}: PageProps<"/articles/[slug]/preview">) {
  const { slug } = await params;
  return getArticleMetadata(slug);
}

export default async function ArticlePreviewPage({
  params,
}: PageProps<"/articles/[slug]/preview">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const teaser = article.body[0] ?? article.excerpt;

  return (
    <div className="space-y-8">
      <div className="relative">
        <p className="text-lg leading-relaxed">{teaser}</p>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent"
        />
      </div>
      <Paywall />
    </div>
  );
}
