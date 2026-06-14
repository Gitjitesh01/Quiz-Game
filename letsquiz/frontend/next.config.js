/** @type {import('next').NextConfig} */
const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${backendUrl}/uploads/:path*`,
      },
      {
        source: '/toggleActivityStatus/:path*',
        destination: `${backendUrl}/toggleActivityStatus/:path*`,
      },
      {
        source: '/toggleschedule/:path*',
        destination: `${backendUrl}/toggleschedule/:path*`,
      },
    ];
  },
};

export default nextConfig;

