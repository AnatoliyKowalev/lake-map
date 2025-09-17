import { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  basePath: isProd ? "/lake-map" : "",
  assetPrefix: isProd ? "/lake-map/" : "",
  images: {
    unoptimized: true, // Disables image optimization
  },
};

export default nextConfig;
