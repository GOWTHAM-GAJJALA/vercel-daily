import { SubscriptionToggle } from "@/components/subscription-toggle";
import { getIsSubscribed } from "@/lib/session";

/**
 * Server Component that reads the subscription cookie and renders the
 * matching control. Reading cookies is request-time work, so always render
 * this inside <Suspense>; everything around it stays in the static shell.
 */
export async function SubscriptionStatus({
  variant = "header",
}: {
  variant?: "header" | "cta";
}) {
  const subscribed = await getIsSubscribed();
  return <SubscriptionToggle subscribed={subscribed} variant={variant} />;
}
