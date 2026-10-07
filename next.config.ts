import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ftp.goit.study" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "ac.goit.global" },
      { protocol: "https", hostname: "academstore.s3.eu-north-1.amazonaws.com" },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;