import type { NextConfig } from "next"; 
import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(__dirname, "../../.env") });

const nextConfig: NextConfig = {
  images: {
    domains: ["maps.googleapis.com"],
  },
  env: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
};

export default nextConfig;
