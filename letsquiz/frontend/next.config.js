/** @type {import('next').NextConfig} */
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
        destination: 'http://localhost:5000/api/:path*',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:5000/uploads/:path*',
      },
      {
        source: '/toggleActivityStatus/:path*',
        destination: 'http://localhost:5000/toggleActivityStatus/:path*',
      },
      {
        source: '/toggleschedule/:path*',
        destination: 'http://localhost:5000/toggleschedule/:path*',
      },
    ];
  },
};

export default nextConfig;
