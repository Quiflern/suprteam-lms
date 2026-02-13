/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.sanity.io', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;