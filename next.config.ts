import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "pbs.twimg.com",
      },
      { hostname: "lh3.googleusercontent.com" },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "cdn.discordapp.com",
      },
      {
        hostname: "s3.wasabisys.com",
      },
      {
        hostname: "*.wasabisys.com",
      },
    ],
  },
};

export default nextConfig;
