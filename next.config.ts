import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'cdn.jsdelivr.net',
      'prismalens.vercel.app',
      'tailwindcss.com',
      'zod.dev',
      'reactjs.org',
      'miro.medium.com',
      'nodejs.org',
      'www.typescriptlang.org',
      'vercel.com',
      'graphql.org',
    ],
  },
};

export default nextConfig;
