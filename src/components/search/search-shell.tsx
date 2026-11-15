"use client";

import { useRouter } from "next/navigation";
import {
  type FormEvent,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import type { Category } from "@/lib/types";

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 400;

/**
 * Search controls. The URL is the source of truth: every search updates
 * ?q=…&category=…, and the server renders results from those params. So a
 * refresh or a shared link shows the same results.
 *
 * - Typing searches automatically once the query has 3+ characters,
 *   debounced; every keystroke resets the timer.
 * - Enter or the Search button submits immediately (any length).
 * - Clearing the input cancels any pending search and clears the results.
 * - Changing the category searches immediately.
 *
 * Server-rendered results are passed in as children; while a navigation is
 * pending they are dimmed and a status message is announced.
 */
export function SearchShell({
  categories,
  initialQuery,
  initialCategory,
  children,
}: {
  categories: Category[];
  initialQuery: string;
  initialCategory: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastNavigated = useRef({
    query: initialQuery,
    category: initialCategory,
  });

  // Keep the inputs in sync when the URL changes from outside this form
  // (browser back/forward, or a category link elsewhere on the site).
  useEffect(() => {
    const last = lastNavigated.current;
    if (last.query !== initialQuery || last.category !== initialCategory) {
      lastNavigated.current = {
        query: initialQuery,
        category: initialCategory,
      };
      setQuery(initialQuery);
      setCategory(initialCategory);
    }
  }, [initialQuery, initialCategory]);

  // Never fire a stale debounced search after unmounting.
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function cancelPendingSearch() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function navigate(nextQuery: string, nextCategory: string) {
    cancelPendingSearch();
    lastNavigated.current = { query: nextQuery, category: nextCategory };
    const params = new URLSearchParams();
    if (nextQuery) params.set("q", nextQuery);
    if (nextCategory) params.set("category", nextCategory);
    const search = params.toString();
    startTransition(() => {
      router.replace(search ? `/search?${search}` : "/search", {
        scroll: false,
      });
    });
  }

  function handleQueryChange(value: string) {
    setQuery(value);
    cancelPendingSearch();
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      // Cleared: drop the stale query from the URL right away.
      if (lastNavigated.current.query) navigate("", category);
      return;
    }

    if (trimmed.length >= MIN_QUERY_LENGTH) {
      timer.current = setTimeout(
        () => navigate(trimmed, category),
        DEBOUNCE_MS,
      );
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigate(query.trim(), category);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    navigate(query.trim(), value);
  }

  return (
    <>
      <search>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="relative flex-1">
            <label htmlFor="search-query" className="sr-only">
              Search articles
            </label>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
            >
              <circle cx="9" cy="9" r="6" />
              <path d="M13.5 13.5L17 17" strokeLinecap="round" />
            </svg>
            <input
              id="search-query"
              type="search"
              name="q"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Search articles, authors, topics…"
              autoComplete="off"
              enterKeyHint="search"
              maxLength={100}
              className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-10 text-base outline-none transition focus:border-foreground sm:text-sm"
            />
            {query ? (
              <button
                type="button"
                onClick={() => handleQueryChange("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-md text-muted hover:bg-surface hover:text-foreground"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  className="size-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round" />
                </svg>
              </button>
            ) : null}
          </div>

          <div className="flex gap-3">
            <label htmlFor="search-category" className="sr-only">
              Category
            </label>
            <select
              id="search-category"
              name="category"
              value={category}
              onChange={(event) => handleCategoryChange(event.target.value)}
              className="h-11 flex-1 rounded-lg border border-border bg-background px-3 text-base outline-none focus:border-foreground sm:w-44 sm:flex-none sm:text-sm"
            >
              <option value="">All categories</option>
              {categories.map((option) => (
                <option key={option.slug} value={option.slug}>
                  {option.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="h-11 rounded-lg bg-foreground px-5 text-sm font-semibold text-background transition hover:opacity-85"
            >
              Search
            </button>
          </div>
        </form>
      </search>

      <p className="mt-3 h-5 text-xs text-muted" aria-live="polite">
        {isPending ? (
          <span className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-3 animate-spin rounded-full border-2 border-muted border-t-transparent"
            />
            Searching…
          </span>
        ) : query.trim().length > 0 &&
          query.trim().length < MIN_QUERY_LENGTH ? (
          `Type at least ${MIN_QUERY_LENGTH} characters, or press Enter to search.`
        ) : null}
      </p>

      <div
        aria-busy={isPending}
        className={`mt-6 transition-opacity ${isPending ? "opacity-50" : ""}`}
      >
        {children}
      </div>
    </>
  );
}
