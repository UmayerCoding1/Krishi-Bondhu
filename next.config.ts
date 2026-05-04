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
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       // destination: 'https://ks-auth-server.vercel.app/api/:path*', //production
  //       destination: 'http://localhost:5000/api/:path*', //development
  //     },
  //   ];
  // },
};

export default nextConfig;