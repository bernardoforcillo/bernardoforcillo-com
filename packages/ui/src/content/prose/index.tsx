import type { FC } from 'react';
import { cn } from '../../lib/cn';

export const PROSE_CLASS_NAME =
  'mt-10 space-y-5 text-base leading-8 text-muted [&_a]:text-ink [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-4 [&_a]:hover:decoration-ink [&_h1]:text-3xl [&_h1]:font-medium [&_h1]:tracking-tight [&_h1]:text-ink [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-ink [&_h3]:text-xl [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-ink [&_li]:list-disc [&_li]:ml-6 [&_pre]:overflow-x-auto [&_pre]:bg-line/50 [&_pre]:p-4';

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
