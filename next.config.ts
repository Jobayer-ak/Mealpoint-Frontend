import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'example.com', port: '', pathname: '/**' },
      {
        protocol: 'https',
        hostname: 'tastyc.bslthemes.com',
        port: '',
        // pathname: '/wp-content/uploads/**',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
