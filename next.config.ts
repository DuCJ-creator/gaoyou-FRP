import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'gaoyou-FRP';
const basePath = isGitHubPages ? `/${repository}` : '';

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: 'export' as const,
        trailingSlash: true,
        basePath,
        assetPrefix: basePath,
        images: { unoptimized: true },
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
