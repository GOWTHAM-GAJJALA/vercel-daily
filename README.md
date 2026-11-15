# Vercel Daily

A fictional news publication built with **Next.js 16** (App Router, Cache Components) for the Next.js Foundations certification assignment.

## Run it locally

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start   # production build
pnpm lint       # Biome
```

Optional environment variable:

| Name | Purpose |
| --- | --- |
| `SUBSCRIPTION_SECRET` | HMAC key that signs the subscription cookie. Set it in production. Without it, a dev-only fallback is used. |

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Hero with featured story image, breaking-news banner, grid of 6+ featured articles (image, headline, category, date, link) |
| `/articles/[slug]` | Headline, author, date, category, hero image, full body for subscribers, 4 trending articles, subscribe CTA for non-subscribers |
| `/search` | Text search + category filter, debounced auto-search, results in the URL, default recent articles, empty and loading states |

A shared root layout renders the persistent header (logo, Home and Search links, subscription status) and the footer (copyright and year) on every page.

## Where each requirement lives

### Cache Components and `"use cache"`
- `next.config.ts` turns on `cacheComponents: true`.
- `src/lib/api.ts` is the only data-access layer. Catalog reads use `"use cache"` with `cacheLife("hours")` and `cacheTag(...)`, so they're prerendered into the static shell. Breaking news uses `cacheLife("minutes")`, so the banner rotates. Trending calls `connection()`, so it's always request-time.
- `src/components/site-footer.tsx` caches the copyright year (`cacheLife("days")`).

The build output shows every route as Partial Prerender (◐): a static shell, plus dynamic content streamed in.

### Suspense boundaries
Request-time pieces stream in behind `<Suspense>` with skeleton fallbacks (`src/components/skeletons.tsx`):
- the breaking-news banner and the hero subscribe CTA, in `src/app/page.tsx`
- trending articles, in `src/app/articles/[slug]/layout.tsx`
- the header subscription status, in `src/components/site-header.tsx`
- search results keyed on `searchParams`, in `src/app/search/page.tsx`

### Server Actions: subscribe and unsubscribe
`src/app/actions.ts` exports `subscribe()` and `unsubscribe()`. Subscribing sets an **httpOnly, signed session cookie** (`vd_subscription`) with no expiry. That means it survives refreshes and navigation within the browser session, and nobody can forge it by hand (`src/lib/subscription.ts`, HMAC-SHA256 via Web Crypto). The header toggle (`src/components/subscription-toggle.tsx`) calls the actions and refreshes the route.

### Proxy: paywall enforcement
`src/proxy.ts` (Next 16's replacement for `middleware.ts`) checks the cookie signature on `/articles/*`:
- **Non-subscribers** are *rewritten* (the URL doesn't change) to `/articles/[slug]/preview`. That route only renders the headline, featured image, a teaser paragraph and a prominent subscribe CTA (`src/components/paywall.tsx`). The full body is never sent, not even in the RSC payload.
- **Subscribers** get the full article. If they open a `/preview` URL, they're redirected to the full one.

Because the paywall decision happens in the proxy, neither article route reads cookies, and both stay fully prerendered.

### Search
`src/components/search/search-shell.tsx` (client) treats the URL as the source of truth:
- auto-searches at 3+ characters, debounced 400 ms; each keystroke resets the timer
- Enter or the Search button submits right away
- clearing the input cancels the pending search and removes the stale `q` from the URL
- changing the category searches right away
- `useTransition` dims the results and announces "Searching…" while results load

`src/app/search/page.tsx` filters on the server from `?q=&category=`, so a refresh or a shared link shows the same results. It returns up to 5 matches, recent articles by default, and a message when nothing matches.

### Metadata and Open Graph
- The root layout (`src/app/layout.tsx`) sets a default title template, a description, `metadataBase` and `openGraph`.
- Each page exports its own `metadata` or `generateMetadata`. Article pages use the article's headline, excerpt and image (`src/lib/article-metadata.ts`).
- `src/app/opengraph-image.tsx` generates the default social image.

### Extras
`not-found.tsx` and `error.tsx` boundaries, `next/image` with AVIF/WebP, mobile-first responsive Tailwind layout, and light and dark themes.

## Data

The assignment portal didn't have the API documentation configured. So `src/lib/api.ts` reads a local mock dataset (`src/lib/data/articles.ts`, 18 articles) with a simulated network delay. Each function's signature and caching are already in place, so switching to the real API only means changing the function bodies.
