import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        pathname: "/**",
        hostname: "img.clerk.com",
      }
    ]
  }

};

export default nextConfig;
