import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  TITLE_DEFAULT,
} from '@monorepo/seo';
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import interRegular from '~/assets/fonts/inter/variable-regular.woff2?url';
import { GTM_BOOTSTRAP } from '~/lib/gtm';
import appCss from '~/styles/global.css?url';

export const Route = createRootRoute({
  head: () => ({
    // There is no top-level `title` here: the head option returns only
    // { links, scripts, meta, styles }. The title lives inside `meta`, and the
    // deepest matching route's entry wins.
    meta: [
      { charSet: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1',
      },
      { title: TITLE_DEFAULT },
      { name: 'description', content: SITE_DESCRIPTION },
      { name: 'keywords', content: SITE_KEYWORDS.join(',') },
      { name: 'author', content: SITE_NAME },
      { name: 'creator', content: SITE_NAME },
      { name: 'publisher', content: SITE_NAME },
    ],
    // No rel="canonical" here. Links are not deduplicated across matched
    // routes, so a root canonical plus a leaf canonical emits two of them.
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'author', href: SITE_URL },
      {
        rel: 'preload',
        href: interRegular,
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
    ],
    // Order matters: /config.js defines globalThis.__APP_CONFIG__, which the
    // inline bootstrap immediately below reads.
    scripts: [{ src: '/config.js' }, { children: GTM_BOOTSTRAP }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' className='antialiased h-full'>
      <head>
        <HeadContent />
      </head>
      <body className='relative min-h-full bg-white text-black overflow-x-hidden selection:bg-black selection:text-white'>
        <div className='fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]'>
          <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PHZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')]" />
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]' />
        </div>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
