import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ⚠️ Ignorer les erreurs TypeScript pendant le build
    ignoreBuildErrors: true,
  },
  eslint: {
    // ⚠️ Ignorer les erreurs ESLint pendant le build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
