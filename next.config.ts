import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  distDir: "dist",

  reactStrictMode: true,

  cacheMaxMemorySize: 0,

  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "/dallas-ant-mfe",

  images: {
    unoptimized: true,
  },

  compiler: {
    styledComponents: true,
  },

  generateBuildId: async () => {
    return Date.now().toString();
  },

};

export default nextConfig;
