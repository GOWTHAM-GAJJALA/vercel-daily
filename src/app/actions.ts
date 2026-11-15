"use server";

import { cookies } from "next/headers";
import {
  createSubscriptionToken,
  SUBSCRIPTION_COOKIE,
} from "@/lib/subscription";

/**
 * Subscribes the current visitor. Anonymous: no account is needed.
 *
 * The cookie has no maxAge/expires, so it's a session cookie: it survives
 * refreshes and navigation, and ends when the browser session ends.
 * httpOnly keeps it out of reach of client-side scripts.
 */
export async function subscribe(): Promise<{ subscribed: true }> {
  const cookieStore = await cookies();
  cookieStore.set(SUBSCRIPTION_COOKIE, await createSubscriptionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return { subscribed: true };
}

/** Unsubscribes the current visitor by removing the subscription cookie. */
export async function unsubscribe(): Promise<{ subscribed: false }> {
  const cookieStore = await cookies();
  cookieStore.delete(SUBSCRIPTION_COOKIE);
  return { subscribed: false };
}
