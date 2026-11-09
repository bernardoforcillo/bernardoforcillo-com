import type { FC } from 'react';
import { cn } from '../../lib/cn';

// Grouped by element so each rule is findable. Lists target `ol`/`ul` rather
// than `li`, so ordered lists keep their numbers.
export const PROSE_CLASS_NAME = [
  'mt-10 space-y-5 text-[17px] leading-[1.75] text-deep-blue-800',
  '[&_a]:text-azure-radiance-700 [&_a]:underline [&_a]:decoration-azure-radiance-300 [&_a]:underline-offset-4 [&_a]:hover:decoration-azure-radiance-700',
  '[&_strong]:font-semibold [&_strong]:text-deep-blue-900',
  '[&_h1]:mt-14 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-[-0.03em] [&_h1]:text-deep-blue-900',
  '[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.025em] [&_h2]:text-deep-blue-900',
  '[&_h3]:mt-9 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-[-0.02em] [&_h3]:text-deep-blue-900',
  '[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li]:mt-2 [&_li]:pl-1 [&_li]:marker:text-deep-blue-400',
  '[&_blockquote]:border-l-2 [&_blockquote]:border-azure-radiance-300 [&_blockquote]:pl-5 [&_blockquote]:font-serif [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:text-deep-blue-700',
  '[&_hr]:my-12 [&_hr]:border-deep-blue-200',
  '[&_img]:rounded-xl [&_img]:border [&_img]:border-deep-blue-200',
  '[&_table]:w-full [&_table]:text-[15px] [&_th]:border-b [&_th]:border-deep-blue-200 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_td]:border-b [&_td]:border-deep-blue-100 [&_td]:py-2',
  '[&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:border [&_pre]:border-deep-blue-200 [&_pre]:bg-deep-blue-50 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:focus-visible:outline-2 [&_pre]:focus-visible:outline-offset-2 [&_pre]:focus-visible:outline-azure-radiance-700',
  '[&_code]:rounded [&_code]:bg-deep-blue-50 [&_code]:px-1 [&_code]:text-[0.9em] [&_pre_code]:bg-transparent [&_pre_code]:p-0',
].join(' ');

type Props = {
  /** HTML compiled at build time by Content Collections. Never user input. */
  html: string;
  className?: string;
};

export const Prose: FC<Props> = ({ html, className }) => (
  <div
    className={cn(PROSE_CLASS_NAME, className)}
    // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time markdown
    dangerouslySetInnerHTML={{ __html: html }}
  />
);
