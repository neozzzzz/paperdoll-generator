import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oeqbftqqekfbwqrovgeo.supabase.co',
      },
    ],
  },
  typescript: {
    // 빌드 속도 개선: Vercel에서 TypeScript 에러 무시
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
