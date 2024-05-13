/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});


/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,

  // Any domain with images loaded with NextImage needs to be whitelisted here
  images: {
    domains: ['a.storyblok.com'],
  },

  // SVGR
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });



    return config;
  },
});
