import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        We couldn&apos;t find that story
      </h1>
      <p className="mt-3 text-muted">
        The page may have moved, or the link might be incorrect.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-full bg-foreground px-5 text-sm font-semibold text-background"
        >
          Back to home
        </Link>
        <Link
          href="/search"
          className="inline-flex h-10 items-center rounded-full border border-border px-5 text-sm font-semibold hover:bg-surface"
        >
          Search articles
        </Link>
      </div>
    </div>
  );
}
