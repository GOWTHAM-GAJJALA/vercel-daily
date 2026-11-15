import { ImageResponse } from "next/og";

/** Default Open Graph image for pages that don't set their own. */
export const alt = "Vercel Daily: News for builders of the web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0a0a0a",
        color: "#ededed",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="64" height="56" viewBox="0 0 76 65" fill="#ededed">
          <title>Vercel Daily logo</title>
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
        </svg>
        <div style={{ fontSize: 72, fontWeight: 700 }}>Vercel Daily</div>
      </div>
      <div style={{ marginTop: 32, fontSize: 40, color: "#a1a1aa" }}>
        News for the people building the web.
      </div>
    </div>,
    size,
  );
}
