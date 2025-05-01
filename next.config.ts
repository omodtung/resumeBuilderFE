import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "w0mlmrgwbziwquaq.public.blob.vercel-storage.com"
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com", // Add this line
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ]
  }
};

export default nextConfig;
