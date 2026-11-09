import { Link } from '@tanstack/react-router';
import { ArrowLeft, Mail } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { BUTTON_PRIMARY, BUTTON_SECONDARY } from '~/features/home/styles';
import { CONTACT_EMAIL } from '~/lib/seo';

type Props = {
  /** Used as the subject of the reply email. */
  title: string;
  back: { to: '/blog' | '/notes' | '/projects'; label: string };
};

// TanStack's Link types `to` as the route union; this takes a fixed list.
const BackLink = Link as unknown as FC<{
  to: string;
  className?: string;
  children: ReactNode;
}>;

// Closes a detail page with the two things a finished reader can do next:
// answer it, or go back to the list it came from.
export const ArticleFooter: FC<Props> = ({ title, back }) => (
  <aside aria-label='After reading' className='px-4 pb-14 sm:px-6'>
    <div className='mx-auto flex max-w-[calc(68ch+3rem)] flex-col gap-6 rounded-[22px] border border-deep-blue-200 bg-[radial-gradient(ellipse_at_100%_0%,var(--color-azure-radiance-50),transparent_60%)] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7'>
      <div>
        <p className='font-semibold text-deep-blue-900'>Thoughts on this?</p>
        <p className='mt-1 text-sm text-deep-blue-600'>
          Replies go straight to my inbox.
        </p>
      </div>
      <div className='flex flex-wrap gap-2.5'>
        <BackLink to={back.to} className={BUTTON_SECONDARY}>
          <ArrowLeft size={14} aria-hidden='true' /> {back.label}
        </BackLink>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Re: ${title}`)}`}
          className={BUTTON_PRIMARY}
        >
          <Mail size={14} aria-hidden='true' /> Reply by email
        </a>
      </div>
    </div>
  </aside>
);
