"use client";

import { useRouter } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { subscribe, unsubscribe } from "@/app/actions";

type Variant = "header" | "cta";

/**
 * Subscribe / unsubscribe control.
 *
 * Calls a Server Action to set or clear the subscription cookie, then
 * refreshes the router so proxy.ts re-evaluates the paywall and every
 * server-rendered subscription indicator updates. useOptimistic flips the
 * UI immediately while the action is in flight.
 */
export function SubscriptionToggle({
  subscribed,
  variant = "header",
}: {
  subscribed: boolean;
  variant?: Variant;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticSubscribed, setOptimisticSubscribed] =
    useOptimistic(subscribed);

  function toggle() {
    startTransition(async () => {
      setOptimisticSubscribed(!subscribed);
      if (subscribed) {
        await unsubscribe();
      } else {
        await subscribe();
      }
      router.refresh();
    });
  }

  if (variant === "cta") {
    if (optimisticSubscribed) {
      return (
        <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <CheckIcon /> You&apos;re subscribed. Enjoy full access.
        </p>
      );
    }
    return (
      <button
        type="button"
        onClick={toggle}
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-full bg-foreground px-6 text-sm font-semibold text-background transition hover:opacity-85 disabled:opacity-60"
      >
        {isPending ? "Subscribing…" : "Subscribe for free"}
      </button>
    );
  }

  if (optimisticSubscribed) {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <CheckIcon /> <span className="max-sm:sr-only">Subscribed</span>
        </span>
        <button
          type="button"
          onClick={toggle}
          disabled={isPending}
          className="text-xs font-medium text-muted underline-offset-4 hover:text-foreground hover:underline disabled:opacity-60"
        >
          Unsubscribe
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isPending}
      className="inline-flex h-8 items-center rounded-full bg-foreground px-3.5 text-xs font-semibold text-background transition hover:opacity-85 disabled:opacity-60"
    >
      {isPending ? "Subscribing…" : "Subscribe"}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 8.5l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
