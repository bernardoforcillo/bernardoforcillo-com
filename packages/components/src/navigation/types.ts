import type { ComponentType, ReactNode } from 'react';

/**
 * Router-agnostic link. Pass the app's router link (e.g. TanStack's `Link`)
 * so the shared components stay free of a routing dependency.
 */
export type LinkComponent = ComponentType<{
  to: string;
  className?: string;
  children?: ReactNode;
  activeOptions?: { exact: boolean };
  activeProps?: { className: string };
  inactiveProps?: { className: string };
}>;

export type NavItem = {
  label: string;
  to: string;
  icon?: ReactNode;
  /** Home must match exactly; every other entry is a prefix match. */
  exact?: boolean;
};
