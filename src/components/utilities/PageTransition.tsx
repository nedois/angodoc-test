import React, { FC, ReactNode } from 'react';
import { TransitionGroup, Transition as ReactTransition } from 'react-transition-group';

const TIMEOUT = 150;

const getTransitionStyles = {
  entering: {
    opacity: 0,
    transform: `translateX(50px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0px)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(-50px)`,
  },
};

interface PageTransitionProps {
  children?: ReactNode;
  location: string;
}

const PageTransition: FC<PageTransitionProps> = ({ children, location }) => {
  return (
    <TransitionGroup style={{ position: 'relative' }}>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status: keyof typeof getTransitionStyles) => <div style={{ ...getTransitionStyles[status] }}>{children}</div>}
      </ReactTransition>
    </TransitionGroup>
  );
};
export default PageTransition;
