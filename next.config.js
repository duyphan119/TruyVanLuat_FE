/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "cloudflare-ipfs.com",
      "product.hstatic.net",
      "bizweb.dktcdn.net",
      "cdn.baogiaothong.vn",
      "i1-vnexpress.vnecdn.net",
      "s1.vnecdn.net",
    ],
  },
  env: {
    LAWS_API: process.env.LAWS_API,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_NAME: process.env.DATABASE_NAME,
  },
};

module.exports = nextConfig;
