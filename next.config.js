/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    middleware: true,
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/v0/b/**",
      },
    ],
  },
};

module.exports = nextConfig;
