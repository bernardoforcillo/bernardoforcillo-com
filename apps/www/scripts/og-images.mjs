// Renders a 1200x630 share image (og:image) for every blog post, after the
// site is built: satori lays the template out as SVG, resvg rasterises it to
// PNG. Both run in pure JS/WebAssembly, so the build behaves the same on a
// laptop and in the Alpine image.
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import satori from 'satori';
import YAML from 'yaml';
import {
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  blogOgImagePath,
} from '../src/lib/seo/og-image.ts';

const root = path.resolve(import.meta.dirname, '..');
const require = createRequire(import.meta.url);

const font = (weight) => ({
  name: 'Inter',
  weight,
  style: 'normal',
  // satori reads TTF, OTF and WOFF, not WOFF2.
  data: readFileSync(
    require.resolve(
      `@fontsource/inter/files/inter-latin-${weight}-normal.woff`,
    ),
  ),
});

// The site's palette, dark theme: navy canvas, azure and pink accents.
const COLOR = {
  canvas: '#0b1120',
  ink: '#f3f6fc',
  muted: '#9aa7c2',
  faint: '#6b7895',
  azure: '#5aa2ff',
  pink: '#fd91cc',
};

const MONTHS = 'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' ');
const formatDate = (iso) => {
  const [year, month, day] = iso.split('-').map(Number);
  return `${day} ${MONTHS[month - 1]} ${year}`;
};

const PAD_TOP = 72;
const PAD_BOTTOM = 64;
const PAD_X = 80;
/** Canvas minus the side padding: satori needs explicit widths to wrap. */
const CONTENT_WIDTH = OG_IMAGE_WIDTH - 2 * PAD_X;

/** A satori element without JSX. */
const h = (type, style, children) => ({ type, props: { style, children } });

/** Long headlines step down in size so they still fit in three lines. */
const titleSize = (title) =>
  title.length > 80 ? 54 : title.length > 56 ? 62 : 72;

const template = ({ title, description, category, date }) =>
  h(
    'div',
    {
      // satori sizes boxes as content-box: the padding below is added on top.
      width: CONTENT_WIDTH,
      height: OG_IMAGE_HEIGHT - PAD_TOP - PAD_BOTTOM,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: `${PAD_TOP}px ${PAD_X}px ${PAD_BOTTOM}px`,
      backgroundColor: COLOR.canvas,
      backgroundImage:
        'radial-gradient(circle at 92% 0%, rgba(90,162,255,0.32), rgba(11,17,32,0) 55%), radial-gradient(circle at 0% 100%, rgba(253,145,204,0.14), rgba(11,17,32,0) 45%)',
      fontFamily: 'Inter',
      position: 'relative',
    },
    [
      // The gradient rule the hero name uses, as a band along the top edge.
      h('div', {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: 8,
        backgroundImage: `linear-gradient(90deg, ${COLOR.azure}, ${COLOR.pink})`,
      }),
      h(
        'div',
        {
          display: 'flex',
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 3,
          color: COLOR.azure,
          textTransform: 'uppercase',
        },
        `Blog · ${category}`,
      ),
      h(
        'div',
        { display: 'flex', flexDirection: 'column', width: CONTENT_WIDTH },
        [
          h(
            'div',
            {
              display: 'block',
              width: CONTENT_WIDTH,
              fontSize: titleSize(title),
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: COLOR.ink,
              lineClamp: 3,
            },
            title,
          ),
          h(
            'div',
            {
              display: 'block',
              width: CONTENT_WIDTH,
              marginTop: 28,
              fontSize: 28,
              fontWeight: 400,
              lineHeight: 1.4,
              color: COLOR.muted,
              lineClamp: 2,
            },
            description,
          ),
        ],
      ),
      h(
        'div',
        {
          display: 'flex',
          width: CONTENT_WIDTH,
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        },
        [
          h('div', { display: 'flex', flexDirection: 'column' }, [
            h(
              'div',
              { fontSize: 28, fontWeight: 600, color: COLOR.ink },
              'Bernardo Forcillo',
            ),
            h(
              'div',
              { marginTop: 4, fontSize: 22, color: COLOR.faint },
              'bernardoforcillo.com',
            ),
          ]),
          h('div', { fontSize: 22, color: COLOR.muted }, formatDate(date)),
        ],
      ),
    ],
  );

const readPosts = () => {
  const blogRoot = path.join(root, 'content', 'blog');
  return readdirSync(blogRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((category) =>
      readdirSync(path.join(blogRoot, category.name))
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
          const raw = readFileSync(
            path.join(blogRoot, category.name, file),
            'utf8',
          );
          const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(raw);
          const data = match ? YAML.parse(match[1]) : {};
          return {
            ...data,
            categorySlug: category.name,
            postSlug: file.replace(/\.md$/, ''),
          };
        }),
    )
    .filter((post) => !post.draft && post.title && post.date);
};

await initWasm(
  readFileSync(require.resolve('@resvg/resvg-wasm/index_bg.wasm')),
);
const fonts = [font(400), font(600), font(700)];

const posts = readPosts();
for (const post of posts) {
  const svg = await satori(
    template({
      title: post.title,
      description: post.description ?? '',
      category: post.categorySlug,
      date: String(post.date),
    }),
    { width: OG_IMAGE_WIDTH, height: OG_IMAGE_HEIGHT, fonts },
  );
  const png = new Resvg(svg, {
    fitTo: { mode: 'width', value: OG_IMAGE_WIDTH },
  })
    .render()
    .asPng();
  const out = path.join(
    root,
    'dist',
    'client',
    blogOgImagePath(post.categorySlug, post.postSlug),
  );
  mkdirSync(path.dirname(out), { recursive: true });
  writeFileSync(out, png);
  console.log(
    `og ${path.relative(root, out).replaceAll('\\', '/')} (${Math.round(png.length / 1024)} kB)`,
  );
}
console.log(`OK ${posts.length} share images`);
