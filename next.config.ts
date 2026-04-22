import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL;
const isDevelopment = process.env.NODE_ENV === "development";

function createRemotePattern(url: string) {
  const parsed = new URL(url);

  return {
    protocol: parsed.protocol.replace(":", "") as "http" | "https",
    hostname: parsed.hostname,
    pathname: "/**",
  };
}

const remotePatterns = [
  {
    protocol: "http" as const,
    hostname: "localhost",
    pathname: "/**",
  },
  {
    protocol: "http" as const,
    hostname: "127.0.0.1",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "cocinasjam.com",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "www.cocinasjam.com",
    pathname: "/**",
  },
  ...(strapiUrl ? [createRemotePattern(strapiUrl)] : []),
];

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isDevelopment,
    remotePatterns,
  },
};

export default nextConfig;
