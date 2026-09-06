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
import { NotFound } from '~/features/navigation/molecules/not-found';
import { SiteShell } from '~/features/navigation/organisms/site-shell';
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
  // A notFound() thrown from a `_default` child bubbles all the way to the
  // root, which sits outside that layout — so the screen brings its own shell.
  notFoundComponent: NotFoundScreen,
  shellComponent: RootDocument,
});

function NotFoundScreen() {
  return (
    <SiteShell>
      <NotFound />
    </SiteShell>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' className='antialiased h-full'>
      <head>
        <HeadContent />
      </head>
      <body className='relative min-h-full overflow-x-hidden bg-canvas text-ink selection:bg-signal selection:text-ink'>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
