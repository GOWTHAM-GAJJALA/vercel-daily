import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchResults } from "@/components/search/search-results";
import { SearchShell } from "@/components/search/search-shell";
import { ArticleGridSkeleton } from "@/components/skeletons";
import { getCategories } from "@/lib/api";
import { SITE_NAME } from "@/lib/format";

const description =
  "Search every Vercel Daily story by keyword, author, or topic, and filter by category.";

export const metadata: Metadata = {
  title: "Search",
  description,
  alternates: { canonical: "/search" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: "/search",
    title: `Search | ${SITE_NAME}`,
    description,
  },
};

const MAX_QUERY_LENGTH = 100;

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:pt-14">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Search</h1>
      <p className="mt-2 text-muted">
        Find stories by keyword, author, or topic.
      </p>

      <div className="mt-8">
        {/* searchParams is request-time data, so everything that reads it
            streams in behind this boundary; the heading above is static. */}
        <Suspense fallback={<SearchFallback />}>
          <SearchArea searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function SearchArea({
  searchParams,
}: {
  searchParams: PageProps<"/search">["searchParams"];
}) {
  const params = await searchParams;
  const categories = await getCategories();

  const query = firstValue(params.q).trim().slice(0, MAX_QUERY_LENGTH);
  const requestedCategory = firstValue(params.category);
  // Ignore unknown categories instead of trusting the URL.
  const category = categories.some((c) => c.slug === requestedCategory)
    ? requestedCategory
    : "";

  return (
    <SearchShell
      categories={categories}
      initialQuery={query}
      initialCategory={category}
    >
      {/* A new key per search shows the skeleton while new results load. */}
      <Suspense
        key={`${query}::${category}`}
        fallback={<ArticleGridSkeleton count={query || category ? 3 : 6} />}
      >
        <SearchResults query={query} category={category} />
      </Suspense>
    </SearchShell>
  );
}

function SearchFallback() {
  return (
    <div aria-hidden="true">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="h-11 flex-1 animate-pulse rounded-lg bg-surface" />
        <div className="h-11 w-full animate-pulse rounded-lg bg-surface sm:w-64" />
      </div>
      <div className="mt-14">
        <ArticleGridSkeleton count={6} />
      </div>
    </div>
  );
}
