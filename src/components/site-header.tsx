import Link from "next/link";
import { Suspense } from "react";
import { SubscriptionStatus } from "@/components/subscription-status";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 sm:gap-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 76 65"
            className="size-4"
            fill="currentColor"
          >
            <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
          </svg>
          <span>Vercel Daily</span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2 py-1 text-sm text-muted transition hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto">
          {/* Reads the subscription cookie, so it streams in after the static shell. */}
          <Suspense
            fallback={
              <span className="block h-8 w-24 animate-pulse rounded-full bg-surface" />
            }
          >
            <SubscriptionStatus />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
