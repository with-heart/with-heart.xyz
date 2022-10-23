import withMdx from './mdx.config.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  webpack: (config, options) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    }

    return config
  },
}

export default withMdx(nextConfig)
