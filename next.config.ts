import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.resolve(process.cwd()),
  transpilePackages: ["@splinetool/react-spline", "@splinetool/runtime"],
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@splinetool/react-spline/next": path.resolve(
        process.cwd(),
        "node_modules/@splinetool/react-spline/dist/react-spline.js"
      ),
    };
    return config;
  },
};

export default nextConfig;
