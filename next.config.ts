import type { NextConfig } from "next";

const strapiUrl =
  process.env.STRAPI_URL || process.env.STRAPI_DEV_URL || process.env.STRAPI_PRODUCTION_URL;

const strapiPattern = strapiUrl
  ? (() => {
      const parsed = new URL(strapiUrl);

      return {
        protocol: parsed.protocol.replace(":", "") as "http" | "https",
        hostname: parsed.hostname,
        port: parsed.port,
      };
    })()
  : null;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      ...(strapiPattern ? [strapiPattern] : []),
    ],
  },
};

export default nextConfig;
