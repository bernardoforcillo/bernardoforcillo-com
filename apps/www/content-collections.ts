import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';
import rehypeShiki from '@shikijs/rehype';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { z } from 'zod';
import { splitBlogPath } from './src/content/lib';
import { remarkTikz } from './src/content/remark-tikz';

// `@content-collections/markdown` does not export its `Options` type, so it is
// recovered from `compileMarkdown`'s signature. The annotation is load-bearing:
// without it the nested plugin array widens to `(Plugin | { theme: string })[][]`
// and is rejected by `Options.rehypePlugins: Pluggable[]`, which needs a tuple.
type MarkdownOptions = NonNullable<Parameters<typeof compileMarkdown>[2]>;

const markdownOptions: MarkdownOptions = {
  // `$…$` and `$$…$$` are LaTeX, typeset by KaTeX; ```tikz blocks are TikZ,
  // rendered to SVG. Both happen at build time: the page ships finished
  // markup and needs only stylesheets, no script.
  remarkPlugins: [remarkGfm, remarkMath, remarkTikz],
  // Needed for the SVG figures `remarkTikz` emits as HTML. Every file here is
  // authored in this repo and compiled at build time, so raw HTML is trusted
  // input, not user content.
  allowDangerousHtml: true,
  rehypePlugins: [
    rehypeKatex,
    [rehypeShiki, { theme: 'github-dark-high-contrast' }],
  ],
};

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'date must be written as YYYY-MM-DD');

const baseSchema = {
  title: z.string().min(1),
  description: z.string().min(1),
  date: isoDate,
  content: z.string(),
};

const posts = defineCollection({
  name: 'posts',
  directory: 'content/blog',
  include: '**/*.md',
  schema: z.object({
    ...baseSchema,
    tags: z.array(z.string()).default([]),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document, markdownOptions);
    const { categorySlug, postSlug } = splitBlogPath(document._meta.path);
    return { ...document, categorySlug, postSlug, html };
  },
});

const notes = defineCollection({
  name: 'notes',
  directory: 'content/notes',
  include: '*.md',
  schema: z.object(baseSchema),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document, markdownOptions);
    return { ...document, noteSlug: document._meta.path, html };
  },
});

const projects = defineCollection({
  name: 'projects',
  directory: 'content/projects',
  include: '*.md',
  schema: z.object({
    ...baseSchema,
    stack: z.array(z.string()).default([]),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
  }),
  transform: async (document, context) => {
    const html = await compileMarkdown(context, document, markdownOptions);
    return { ...document, projectSlug: document._meta.path, html };
  },
});

export default defineConfig({
  content: [posts, notes, projects],
});
