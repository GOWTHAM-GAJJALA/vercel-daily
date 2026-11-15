import { SubscriptionToggle } from "@/components/subscription-toggle";

/**
 * Paywall call-to-action shown below the teaser on /articles/[slug]/preview.
 * proxy.ts only serves the preview route to non-subscribers, so the button
 * can render as "not subscribed" without reading cookies here.
 */
export function Paywall() {
  return (
    <aside
      aria-labelledby="paywall-heading"
      className="rounded-2xl border border-border bg-surface p-6 text-center sm:p-10"
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        Subscribers only
      </p>
      <h2
        id="paywall-heading"
        className="mt-2 text-2xl font-semibold tracking-tight"
      >
        Keep reading with a free subscription
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted">
        Subscribe to Vercel Daily to unlock the full story and every article on
        the site. No account needed, and you can unsubscribe anytime.
      </p>
      <div className="mt-6">
        <SubscriptionToggle subscribed={false} variant="cta" />
      </div>
    </aside>
  );
}
