import { dvi2svg, load, tex } from 'node-tikzjax';

/**
 * Renders ```tikz code blocks to inline SVG at build time.
 *
 * A TeX engine compiled to WebAssembly typesets each block, so no LaTeX
 * install is needed and the page ships finished SVG, no script. The block
 * holds a `tikzpicture` (the document wrapper is added when missing); the rest
 * of the info string becomes the figure caption:
 *
 *   ```tikz The Article 14 reporting clock.
 *   % Alt: Aware, then early warning within 24 hours, then ...
 *   \begin{tikzpicture} ... \end{tikzpicture}
 *   ```
 *
 * `% Alt:` lines describe the diagram in words (see `altText`).
 *
 * Two colours follow the site's light and dark themes: black is repainted as
 * `currentColor` (the ink), and `accent` as the `--tikz-accent` CSS variable.
 * Tint with `fill opacity`, never with `black!10` or `accent!15`: a mixed
 * colour is a fixed hex and would not change with the theme.
 */

type Node = {
  type: string;
  lang?: string | null;
  meta?: string | null;
  value?: string;
  children?: Node[];
};

/** Drawn by TikZ as `accent`; no diagram uses this exact blue otherwise. */
const ACCENT_SENTINEL = '#2563EB';

/** Shared by every diagram, so a block only describes its own picture. */
const PREAMBLE = String.raw`
% Labels in narrow boxes wrap on spaces; a hyphenated word reads as a glitch.
\hyphenpenalty=10000
\exhyphenpenalty=10000
% Sans-serif labels sit closer to the page's type; math stays Computer Modern.
\renewcommand{\familydefault}{\sfdefault}
% A sentinel hex, swapped for the theme's accent after rendering.
\definecolor{accent}{HTML}{${ACCENT_SENTINEL.slice(1)}}
\tikzset{
  every picture/.style={line width=0.7pt},
  box/.style={draw=black, draw opacity=0.28, fill=black, fill opacity=0.035,
    text opacity=1, rounded corners=5pt, align=center, inner sep=6pt,
    font=\small, minimum height=0.95cm},
  hot/.style={box, draw=accent, draw opacity=1, fill=accent,
    fill opacity=0.1, line width=1pt},
  flow/.style={-{Stealth[length=5.5pt, width=4.5pt]}, line width=0.75pt},
  note/.style={font=\scriptsize, align=left},
  tag/.style={fill=accent, fill opacity=0.14, text=accent, text opacity=1,
    rounded corners=5pt, inner sep=2.5pt, font=\scriptsize\bfseries},
}`;

/** TeX points are rendered one-to-one; this brings 10pt type to body size. */
const SCALE = 1.5;

// The engine is a single WebAssembly instance and must not run twice at
// once, while Content Collections may transform documents concurrently.
let queue: Promise<unknown> = Promise.resolve();
let loaded: Promise<void> | undefined;

const render = (source: string): Promise<string> => {
  const job = queue.then(async () => {
    loaded ??= load();
    await loaded;
    const dvi = await tex(source, {
      tikzLibraries: 'arrows.meta,positioning',
      addToPreamble: PREAMBLE,
    });
    return dvi2svg(dvi);
  });
  queue = job.catch(() => undefined);
  return job;
};

const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const ACCENT_ATTR = new RegExp(`\\s(stroke|fill)="${ACCENT_SENTINEL}"`, 'gi');

/**
 * A presentation attribute cannot hold `var()`, so accent attributes move
 * into the element's `style`, merged with any style it already has.
 */
const themeAccent = (svg: string) =>
  svg.replace(/<([a-z]+)\b([^>]*?)(\/?)>/gi, (tag, name, attrs, close) => {
    const props: string[] = [];
    let rest = attrs.replace(ACCENT_ATTR, (_: string, prop: string) => {
      props.push(`${prop}:var(--tikz-accent)`);
      return '';
    });
    if (props.length === 0) {
      return tag;
    }
    const existing = /\sstyle="([^"]*)"/.exec(rest);
    rest = rest.replace(/\sstyle="[^"]*"/, '');
    const style = [existing?.[1], ...props].filter(Boolean).join(';');
    return `<${name}${rest} style="${style}"${close}>`;
  });

/**
 * `% Alt: …` comment lines in a block, joined: a plain-language description
 * of what the diagram shows. TeX ignores them; screen readers get them as the
 * image's label, and agents reading the markdown source get them as text.
 */
const altText = (body: string) =>
  body
    .split('\n')
    .map((line) => /^\s*%\s*Alt:\s*(.+)$/i.exec(line)?.[1]?.trim())
    .filter(Boolean)
    .join(' ');

const toFigure = (svg: string, caption: string, alt: string) => {
  const label = alt || caption;
  const themed = themeAccent(svg)
    .replace(/(stroke|fill)="(#000|#000000|black)"/g, '$1="currentColor"')
    .replace(
      /<svg([^>]*?)\swidth="([\d.]+)"\s+height="[\d.]+"/,
      (_, attrs, width) =>
        `<svg${attrs} width="${(Number(width) * SCALE).toFixed(1)}" fill="currentColor" role="img"${
          label ? ` aria-label="${escapeHtml(label)}"` : ''
        }`,
    );
  const figcaption = caption
    ? `<figcaption>${escapeHtml(caption)}</figcaption>`
    : '';
  return `<figure class="tikz">${themed}${figcaption}</figure>`;
};

const collect = (node: Node, found: Node[]) => {
  if (node.type === 'code' && node.lang === 'tikz') {
    found.push(node);
  }
  for (const child of node.children ?? []) {
    collect(child, found);
  }
};

export const remarkTikz = () => async (tree: Node) => {
  const blocks: Node[] = [];
  collect(tree, blocks);
  for (const block of blocks) {
    const body = block.value ?? '';
    const source = body.includes('\\begin{document}')
      ? body
      : `\\begin{document}\n${body}\n\\end{document}`;
    const svg = await render(source).catch((error: unknown) => {
      // The engine only says "render failed"; name the block so it can be
      // found. A common cause is a style named after a built-in TikZ key
      // (`step`, `label`, `grid`...).
      throw new Error(
        `TikZ block "${block.meta?.trim() || body.slice(0, 60)}" failed to render: ${String(error)}`,
      );
    });
    // Turned into an HTML node in place: `remark-rehype` passes it through
    // because raw HTML is allowed for this content.
    block.type = 'html';
    block.value = toFigure(svg, block.meta?.trim() ?? '', altText(body));
    block.lang = undefined;
    block.meta = undefined;
  }
};
