import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  // The app's backend only accepts browser calls from the app's own address, so the landing
  // calls it through this server: /backend/api/... is forwarded to NEXT_PUBLIC_API_BASE/api/...
  async rewrites() {
    const api = (process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000").replace(/\/+$/, "");
    return [{ source: "/backend/api/:path*", destination: `${api}/api/:path*` }];
  },
  partialPrefetching: true,
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
