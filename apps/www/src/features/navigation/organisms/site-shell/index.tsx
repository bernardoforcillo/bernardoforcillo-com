import {
  Footer,
  type LinkComponent,
  type NavItem,
  Navbar,
} from '@monorepo/components';
import { Link } from '@tanstack/react-router';
import { BookOpen, Folder, Home, StickyNote, User } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import type { FC, ReactNode } from 'react';
import { m } from '~/i18n';
import { BUILD_YEAR } from '~/lib/build-info';

type Props = {
  children: ReactNode;
};

// TanStack's Link types `to` as the route union; the shared components take a plain string.
const RouterLink = Link as unknown as LinkComponent;

const mainNavLinks: NavItem[] = [
  { label: 'Home', to: '/', icon: <Home size={16} />, exact: true },
  { label: 'Blog', to: '/blog', icon: <BookOpen size={16} /> },
  { label: 'Projects', to: '/projects', icon: <Folder size={16} /> },
  { label: 'Notes', to: '/notes', icon: <StickyNote size={16} /> },
  { label: 'About', to: '/about', icon: <User size={16} /> },
];

const legalLinks: NavItem[] = [
  { label: 'Privacy', to: '/policies/privacy-policy' },
  { label: 'Cookies', to: '/policies/cookies-policy' },
  { label: 'Attributions', to: '/attributions' },
];

const elsewhereLinks = [
  { label: 'GitHub', href: 'https://github.com/bernardoforcillo' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/bernardoforcillo' },
  { label: 'Email', href: 'mailto:hello@bernardoforcillo.com' },
];

export const SiteShell: FC<Props> = ({ children }) => (
  <MotionConfig reducedMotion='user'>
    <div className='flex flex-col min-h-screen'>
      <Navbar Link={RouterLink} brand='Bernardo' items={mainNavLinks} />
      <main className='flex-1'>{children}</main>
      <Footer
        Link={RouterLink}
        name='Bernardo Forcillo'
        tagline='Independent thinking and deep engineering for systems that move from research to reality.'
        location='Pisa, EU'
        rights={m.footer_rights({ year: BUILD_YEAR })}
        index={mainNavLinks}
        legal={legalLinks}
        elsewhere={elsewhereLinks}
      />
    </div>
  </MotionConfig>
);
