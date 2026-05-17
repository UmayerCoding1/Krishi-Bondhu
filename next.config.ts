import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // allows all hostnames
      },
    ],
  },
   async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: `https://krishi-bondhu-server1.onrender.com/api/v1/:path*`,
            },
        ];
    },
};

export default nextConfig;