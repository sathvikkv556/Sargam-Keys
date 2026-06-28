import type { NextConfig } from "next";


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
  // Optionally extend with next-seo defaults (handled in layout)
};

export default nextConfig;
