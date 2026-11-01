import {
  Footer,
  type LinkComponent,
  type NavItem,
  Navbar,
  Rail,
} from '@monorepo/components';
import { Link } from '@tanstack/react-router';
import { BookOpen, Folder, Home, Mail, StickyNote, User } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import type { FC, ReactNode } from 'react';
import GithubIcon from '~/assets/icons/github-mark';
import LinkedinMark from '~/assets/icons/linkedin-mark';
import { m } from '~/i18n';
import { BUILD_YEAR } from '~/lib/build-info';
import { CONTACT_EMAIL } from '~/lib/seo';

type Props = {
  children: ReactNode;
};

// TanStack's Link types `to` as the route union; the shared components take a plain string.
const RouterLink = Link as unknown as LinkComponent;

const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;

const mainNavLinks: NavItem[] = [
  { label: 'Home', to: '/', icon: <Home size={16} />, exact: true },
  { label: 'Projects', to: '/projects', icon: <Folder size={16} /> },
  { label: 'Blog', to: '/blog', icon: <BookOpen size={16} /> },
  { label: 'Notes', to: '/notes', icon: <StickyNote size={16} /> },
  { label: 'About', to: '/about', icon: <User size={16} /> },
];

const legalLinks: NavItem[] = [
  { label: 'Privacy', to: '/policies/privacy-policy' },
  { label: 'Cookies', to: '/policies/cookies-policy' },
  { label: 'Attributions', to: '/attributions' },
];

const elsewhereLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/bernardoforcillo',
    icon: <GithubIcon aria-hidden='true' className='h-4 w-4' />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/bernardoforcillo',
    icon: <LinkedinMark aria-hidden='true' className='h-4 w-4' />,
  },
  {
    label: 'Email',
    href: CONTACT_HREF,
    icon: <Mail aria-hidden='true' size={16} />,
  },
];

export const SiteShell: FC<Props> = ({ children }) => (
  <MotionConfig reducedMotion='user'>
    <Rail className='flex flex-col'>
      <Navbar
        Link={RouterLink}
        brand='Bernardo Forcillo'
        items={mainNavLinks}
        cta={{ label: 'Get in touch', href: CONTACT_HREF }}
      />
      <main className='flex-1'>{children}</main>
      <Footer
        Link={RouterLink}
        name='Bernardo Forcillo'
        tagline='Independent thinking and deep engineering for systems that move from research to reality.'
        site='bernardoforcillo.com'
        wordmark='Bernardo Forcillo'
        rights={m.footer_rights({ year: BUILD_YEAR })}
        index={mainNavLinks}
        legal={legalLinks}
        elsewhere={elsewhereLinks}
      />
    </Rail>
  </MotionConfig>
);
