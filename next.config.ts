import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  domains: [
    "i.imgur.com"
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
