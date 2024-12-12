/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.ddimg.cn",
      },
      {
        protocol: "https",
        hostname: "*.360buyimg.com",
      },
      {
        protocol: "https",
        hostname: "www0.kfzimg.com",
      },
    ],
  },
};

export default nextConfig;
