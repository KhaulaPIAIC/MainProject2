/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
// next.config.js
module.exports = {
    env: {
      JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    },
  };
