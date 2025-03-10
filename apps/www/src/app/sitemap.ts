import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      priority: 1.0,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      url: 'https://bernardoforcillo.com',
    },
  ];
}
