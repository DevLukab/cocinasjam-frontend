import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL;
const isDevelopment = process.env.NODE_ENV === "development";

const strapiPattern = strapiUrl
  ? (() => {
      const parsed = new URL(strapiUrl);

      return {
        protocol: parsed.protocol.replace(":", "") as "http" | "https",
        hostname: parsed.hostname,
      };
    })()
  : null;

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isDevelopment,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
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
