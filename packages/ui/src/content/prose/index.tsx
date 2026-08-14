import type { FC } from 'react';
import { cn } from '../../lib/cn';

export const PROSE_CLASS_NAME =
  'mt-10 space-y-5 text-base leading-8 text-gray-700 [&_a]:underline [&_h1]:text-4xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:text-2xl [&_h3]:font-semibold [&_li]:list-disc [&_li]:ml-6 [&_pre]:overflow-x-auto [&_pre]:bg-gray-100 [&_pre]:p-4';

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
