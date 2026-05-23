import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/app-reviews",
        destination: "/game-safety",
        permanent: true,
      },
      {
        source: "/platforms",
        destination: "/game-safety",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
