import { cacheLife } from "next/cache";
import Link from "next/link";

/**
 * The current year. Reading the clock outside a cache scope would make the
 * whole page dynamic, so it's cached for a day and stays in the static shell.
 */
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          &copy; <CopyrightYear /> Vercel Daily. All rights reserved.
        </p>
        <nav aria-label="Footer" className="flex gap-4">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <Link href="/search" className="hover:text-foreground">
            Search
          </Link>
        </nav>
      </div>
    </footer>
  );
}
