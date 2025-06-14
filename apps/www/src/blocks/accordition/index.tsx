'use client';

import {
  type HTMLAttributes,
  type ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

export type AccorditionContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useAccordition = (): [boolean, (open: boolean) => void] => {
  const context = useContext(AccorditionContext);
  if (!context) {
    throw new Error('useAccordition must be used within a Accordition');
  }
  return [context.open, context.setOpen];
};

const AccorditionContext = createContext<AccorditionContextType>(
  {} as AccorditionContextType,
);

type AccorditionProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Accordition = ({ children, ...props }: AccorditionProps) => {
  const [open, setOpen] = useState(false);
  return (
    <AccorditionContext.Provider value={{ open, setOpen }}>
      <div {...props}>{children}</div>
    </AccorditionContext.Provider>
  );
};

type AccorditionTriggerProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export const AccorditionTrigger = ({
  children,
  ...props
}: AccorditionTriggerProps) => {
  const { open, setOpen } = useContext(AccorditionContext);
  return (
    <button onClick={() => setOpen(!open)} {...props}>
      {children}
    </button>
  );
};

type AccorditionPanelProps = {
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const AccorditionPanel = ({
  children,
  className,
  ...props
}: AccorditionPanelProps) => {
  const { open } = useContext(AccorditionContext);
  return open ? (
    <div className={className} {...props}>
      {children}
    </div>
  ) : null;
};
