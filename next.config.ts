import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/blog/buying-a-car-savings",
        destination: "/blog/how-to-save-for-a-car",
        permanent: true,
      },
      {
        source: "/blog/emi-formula-explained",
        destination: "/blog/how-is-loan-emi-calculated",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
