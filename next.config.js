/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "randompokemon.com",
      "avatars.githubusercontent.com",
      "cdn.neoline.io",
    ],
  },
};

module.exports = nextConfig;
