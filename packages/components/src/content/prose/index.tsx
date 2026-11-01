import type { FC } from 'react';
import { cn } from '../../lib/cn';

export const PROSE_CLASS_NAME =
  'mt-10 space-y-5 text-base leading-8 text-deep-blue-800 [&_a]:text-azure-radiance-700 [&_a]:underline [&_a]:decoration-azure-radiance-300 [&_a]:underline-offset-4 [&_a]:hover:decoration-azure-radiance-700 [&_h1]:text-3xl [&_h1]:font-medium [&_h1]:tracking-tight [&_h1]:text-deep-blue-900 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-deep-blue-900 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:tracking-tight [&_h3]:text-deep-blue-900 [&_li]:list-disc [&_li]:ml-6 [&_pre]:overflow-x-auto [&_pre]:bg-deep-blue-50 [&_pre]:border [&_pre]:border-deep-blue-200 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:focus-visible:outline-2 [&_pre]:focus-visible:outline-offset-2 [&_pre]:focus-visible:outline-azure-radiance-700 [&_code]:bg-deep-blue-50 [&_code]:rounded [&_code]:px-1 [&_pre_code]:bg-transparent [&_pre_code]:p-0';

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
