import type {
  ConventionContext,
  MetadataRoute,
} from '@bernardoforcillo/vite-seo';
import { SITE_DESCRIPTION, SITE_NAME } from '~/lib/seo';

export default (ctx: ConventionContext): MetadataRoute.Llms => {
  const section = (title: string, prefix: string) => ({
    title,
    links: ctx.content
      .filter((entry) => entry.url.startsWith(prefix))
      .map((entry) => ({
        title: entry.title,
        url: entry.url,
        notes: entry.description,
      })),
  });
  return {
    title: SITE_NAME,
    summary: SITE_DESCRIPTION,
    sections: [
      section('Blog', '/blog/'),
      section('Notes', '/notes/'),
      section('Projects', '/projects/'),
      {
        title: 'Pages',
        optional: true,
        links: [
          { title: 'About', url: '/about' },
          { title: 'Privacy policy', url: '/policies/privacy-policy' },
          { title: 'Cookies policy', url: '/policies/cookies-policy' },
        ],
      },
    ].filter((entry) => entry.links.length > 0),
  };
};
