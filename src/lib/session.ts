import { cookies } from "next/headers";
import {
  isValidSubscriptionToken,
  SUBSCRIPTION_COOKIE,
} from "@/lib/subscription";

/**
 * Reads the visitor's subscription status from the request cookies.
 *
 * This is request-time data: any component that calls it must be rendered
 * inside a <Suspense> boundary so the rest of the page can stay in the
 * prerendered static shell.
 */
export async function getIsSubscribed(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidSubscriptionToken(cookieStore.get(SUBSCRIPTION_COOKIE)?.value);
}
