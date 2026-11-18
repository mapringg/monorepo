import type { NextConfig } from "next";

const apiUrl = process.env.API_URL ?? "http://localhost:8787";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  typedRoutes: true,
  redirects: async () => [{ source: "/", destination: "/notes", permanent: false }],
  rewrites: async () => [{ source: "/api/:path*", destination: `${apiUrl}/api/:path*` }],
};

export default nextConfig;
