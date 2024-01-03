import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bernardoforcillo.com',
      lastModified: new Date(),
    },
  ];
}
