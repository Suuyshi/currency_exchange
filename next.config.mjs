/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output: "standalone",
  images: {
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
