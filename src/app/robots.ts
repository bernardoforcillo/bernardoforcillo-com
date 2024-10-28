import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    host: 'https://bernardoforcillo.com',
    sitemap: 'https://bernardoforcillo.com/sitemap.xml',
  };
}
