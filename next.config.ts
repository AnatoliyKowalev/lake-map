import { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  basePath: isProd ? "/lake-map" : "", // Adjusts base path for production
  assetPrefix: isProd ? "/lake-map/" : "", // Adjusts asset prefix for production
  images: {
    unoptimized: true, // Disables image optimization
  },
};

export default nextConfig;
