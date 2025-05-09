import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { dependencies } from 'package.json';

const withNextIntl = createNextIntlPlugin('./src/scripts/i18n/index.ts');

const config: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: Object.keys(dependencies || {}),
};

export default withNextIntl(config);
