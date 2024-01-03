import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'ia_archiver',
        disallow: '/',
      },
      {
        userAgent: 'archive.org_bot',
        disallow: '/',
      },
    ],
    host: 'https://bernardoforcillo.com',
    sitemap: 'https://bernardoforcillo.com/sitemap.xml',
  };
}
