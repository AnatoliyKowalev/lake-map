// next.config.js
const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export", // ensures next export works
  basePath: isProd ? "/lake-map" : "",
  assetPrefix: isProd ? "/lake-map/" : "",
};
