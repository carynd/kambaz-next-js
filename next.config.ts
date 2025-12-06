import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.spacelaunchschedule.com",
      },
      {
        protocol: "https",
        hostname: "www.staradvertiser.com",
      },
    ],
  },
};

export default nextConfig;
