import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/ky-english-reader",
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
