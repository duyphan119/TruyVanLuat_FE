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
};

module.exports = nextConfig;
