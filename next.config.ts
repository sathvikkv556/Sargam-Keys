import type { NextConfig } from "next";
import { withSX } from "next-sx"; // placeholder for any plugin if needed

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // Enable strict mode and future Web Vitals monitoring
  reactStrictMode: true,
  swcMinify: true,
  // Optionally extend with next-seo defaults (handled in layout)
};

export default nextConfig;
