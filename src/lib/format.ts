// UTC keeps server and client output identical, so dates never cause a
// hydration mismatch regardless of the visitor's time zone.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeZone: "UTC",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export const SITE_NAME = "Vercel Daily";
export const SITE_DESCRIPTION =
  "Vercel Daily brings you the latest on web development, AI, security, design, and the developer community.";

/** Canonical site origin, used as metadataBase for absolute Open Graph URLs. */
export function getSiteUrl(): URL {
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (production) return new URL(`https://${production}`);
  const preview = process.env.VERCEL_URL;
  if (preview) return new URL(`https://${preview}`);
  return new URL("http://localhost:3000");
}
