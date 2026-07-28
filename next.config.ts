import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable SWR (Stale-While-Revalidate) for better performance
  revalidate: 3600, // 1 hour default revalidation

  // Optimize images for better SEO and performance
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Add security headers for SEO and performance
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
        ],
      },
    ];
  },

  // Redirects for SEO - ensure www vs non-www consistency
  async redirects() {
    return [];
  },

  // Rewrites for clean URLs
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // Experimental features for performance
  experimental: {
    // Enable partial pre-rendering for better Core Web Vitals
    ppr: true,
  },
};

export default nextConfig;
