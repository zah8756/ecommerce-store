import type { NextConfig } from "next";
import path from "node:path";

// Windows: path.dirname("F:\\ecommerce-store") is "F:\\", which breaks bare
// CSS @import "tailwindcss" resolution. Pin Turbopack root to this directory.
const projectRoot = path.resolve(__dirname);

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
