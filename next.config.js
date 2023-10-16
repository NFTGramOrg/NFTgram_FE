/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["randompokemon.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
