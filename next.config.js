/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cloudflare-ipfs.com",
      "product.hstatic.net",
      "bizweb.dktcdn.net",
    ],
  },
  env: {
    LAWS_API: process.env.LAWS_API,
  },
};

module.exports = nextConfig;
