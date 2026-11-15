import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components: every route prerenders a static shell. Request-time
  // work (cookies, searchParams, connection()) must sit behind <Suspense>,
  // and shared data is cached explicitly with "use cache".
  cacheComponents: true,
  // Links prefetch a reusable shell so navigations feel instant.
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
