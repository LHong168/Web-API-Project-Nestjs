import type { NextConfig } from "next";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { env } from "./env.mjs";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
};

export default nextConfig;
