import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow dev origins to prevent HMR websocket block
  allowedDevOrigins: ['127.0.0.1', 'localhost', '192.168.6.13'],
};

export default nextConfig;
