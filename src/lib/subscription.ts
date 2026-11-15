/**
 * Anonymous, cookie-based subscriptions.
 *
 * The cookie value is `<id>.<signature>`, where the signature is an
 * HMAC-SHA256 of the id using SUBSCRIPTION_SECRET. A visitor can't forge a
 * subscription by hand-writing the cookie, because they don't know the secret.
 *
 * Uses only Web Crypto, so the same code runs in proxy.ts and on the server.
 */

export const SUBSCRIPTION_COOKIE = "vd_subscription";

const DEV_FALLBACK_SECRET = "vercel-daily-dev-only-secret-change-me";

function getSecret(): string {
  return process.env.SUBSCRIPTION_SECRET || DEV_FALLBACK_SECRET;
}

const encoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer): string {
  let binary = "";
  for (const byte of new Uint8Array(bytes)) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sign(id: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(id));
  return toBase64Url(signature);
}

/** Constant-time string comparison, so signatures can't be guessed byte by byte. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Creates a new signed subscription cookie value. */
export async function createSubscriptionToken(): Promise<string> {
  const id = crypto.randomUUID();
  return `${id}.${await sign(id)}`;
}

/** True if the cookie value is present and carries a valid signature. */
export async function isValidSubscriptionToken(
  value: string | undefined,
): Promise<boolean> {
  if (!value) return false;
  const separator = value.lastIndexOf(".");
  if (separator <= 0) return false;
  const id = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  return safeEqual(signature, await sign(id));
}
