import { type NextRequest, NextResponse } from "next/server";
import {
  isValidSubscriptionToken,
  SUBSCRIPTION_COOKIE,
} from "@/lib/subscription";

/**
 * Paywall enforcement.
 *
 * - Non-subscribers requesting /articles/<slug> are rewritten (the URL stays
 *   the same) to /articles/<slug>/preview, a separate route that only ever
 *   renders the headline, image, and teaser. The full article body is never
 *   sent to a non-subscriber, not even in the RSC payload.
 * - Subscribers who land on /articles/<slug>/preview are redirected to the
 *   full article.
 *
 * Because the decision happens here, both article routes stay fully cached
 * and prerendered; neither page has to read cookies itself.
 */
export async function proxy(request: NextRequest) {
  const match = request.nextUrl.pathname.match(
    /^\/articles\/([^/]+)(\/preview)?\/?$/,
  );
  if (!match) return NextResponse.next();

  const [, slug, preview] = match;
  const subscribed = await isValidSubscriptionToken(
    request.cookies.get(SUBSCRIPTION_COOKIE)?.value,
  );

  if (!subscribed && !preview) {
    const url = request.nextUrl.clone();
    url.pathname = `/articles/${slug}/preview`;
    return NextResponse.rewrite(url);
  }

  if (subscribed && preview) {
    const url = request.nextUrl.clone();
    url.pathname = `/articles/${slug}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/articles/:path*"],
};
