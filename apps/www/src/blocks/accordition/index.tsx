'use client';

import type { HTMLAttributes, ReactNode } from 'react';
import {
  Button,
  type ButtonProps,
  Disclosure,
  DisclosurePanel,
  type DisclosureProps,
} from 'react-aria-components';

type AccorditionProps = {
  children: ReactNode;
  defaultExpanded?: boolean;
} & Omit<DisclosureProps, 'children'> &
  HTMLAttributes<HTMLDivElement>;

export const Accordition = ({
  children,
  defaultExpanded = false,
  className,
  ...props
}: AccorditionProps) => {
  return (
    <Disclosure defaultExpanded={defaultExpanded} {...props}>
      <div className={className}>{children}</div>
    </Disclosure>
  );
};
type AccorditionTriggerProps = {
  children: ReactNode;
} & Omit<ButtonProps, 'children'>;

export const AccorditionTrigger = ({
  children,
  ...props
}: AccorditionTriggerProps) => {
  return (
    <Button slot='trigger' {...props}>
      {children}
    </Button>
  );
};

type AccorditionPanelProps = {
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, 'role'>;

export const AccorditionPanel = ({
  children,
  ...props
}: AccorditionPanelProps) => {
  return <DisclosurePanel {...props}>{children}</DisclosurePanel>;
};
