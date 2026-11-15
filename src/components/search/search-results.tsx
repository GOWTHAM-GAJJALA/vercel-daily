import { ArticleGrid } from "@/components/article-card";
import { getCategoryName, getRecentArticles, searchArticles } from "@/lib/api";

/**
 * Server-rendered search results for the current URL.
 * - No query and no category: a default list of recent articles.
 * - Otherwise: up to 5 matches, or an empty state.
 */
export async function SearchResults({
  query,
  category,
}: {
  query: string;
  category: string;
}) {
  if (!query && !category) {
    const recent = await getRecentArticles(6);
    return (
      <section aria-labelledby="results-heading">
        <h2
          id="results-heading"
          className="mb-6 text-lg font-semibold tracking-tight"
        >
          Recent articles
        </h2>
        <ArticleGrid articles={recent} />
      </section>
    );
  }

  const results = await searchArticles({ query, category, limit: 5 });
  const scope = category ? ` in ${getCategoryName(category)}` : "";
  const label = query ? `“${query}”${scope}` : getCategoryName(category);

  if (results.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border px-6 py-16 text-center">
        <p className="text-lg font-semibold">No articles found</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Nothing matched {label}. Try a different keyword or choose another
          category.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby="results-heading">
      <h2
        id="results-heading"
        className="mb-6 text-lg font-semibold tracking-tight"
      >
        {results.length} {results.length === 1 ? "result" : "results"} for{" "}
        {label}
      </h2>
      <ArticleGrid articles={results} />
    </section>
  );
}
