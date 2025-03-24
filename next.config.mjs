/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  env: {
    NEXT_PUBLIC_CLIENT_VERSION: process.env.NEXT_PUBLIC_CLIENT_VERSION,
  },
};

module.exports = nextConfig;
