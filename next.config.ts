import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.wattpad.com",
      "ma.wattpad.com",
      "images.unsplash.com",
      "res.cloudinary.com",
    ], // Add both domains
  },
};

export default nextConfig;
