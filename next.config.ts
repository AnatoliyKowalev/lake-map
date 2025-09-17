import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // ✅ correct
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/lake-map" : "",
  assetPrefix: isProd ? "/lake-map/" : "",
};

export default nextConfig;
