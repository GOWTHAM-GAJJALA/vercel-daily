import { notFound } from "next/navigation";
import { getArticle } from "@/lib/api";
import { getArticleMetadata } from "@/lib/article-metadata";

/**
 * Full article body. proxy.ts only lets subscribers reach this route;
 * everyone else is rewritten to ./preview, so this page never needs to read
 * cookies and stays fully prerendered.
 */
export async function generateMetadata({
  params,
}: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  return getArticleMetadata(slug);
}

export default async function ArticlePage({
  params,
}: PageProps<"/articles/[slug]">) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <div className="space-y-6 text-lg leading-relaxed">
      {article.body.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
      <ul aria-label="Tags" className="flex flex-wrap gap-2 pt-4">
        {article.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-muted"
          >
            #{tag}
          </li>
        ))}
      </ul>
    </div>
  );
}
