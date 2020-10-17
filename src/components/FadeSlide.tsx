import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';

const height = 20;
const duration = 100;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
  opacity: 0,
  transform: `translateY(${height}px)`,
}

interface ITransitionStyles {
  [key: string]: object;
}

const transitionStyles: ITransitionStyles = {
  entering: {
    opacity: 1,
    transform: 'translateY(0)',
  },
  entered: { opacity: 1, transform: 'translateY(0)' },
  exiting: { opacity: 0, transform: `translateY(${height}px)` },
  exited: { opacity: 0, transform: `translateY(${height}px)` },
};

type FadeSlideProps = {
  duration?: number;
  in?: boolean | undefined;
  children: React.ReactElement;
};

function FadeSlide(props: FadeSlideProps): React.ReactElement {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), props.duration || duration);
  }, [props.in, props.duration]);

  return <Transition in={(props.in || true) && show} timeout={props.duration || duration}>
    {state => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state],
      }}>
        {props.children}
      </div>
    )}
  </Transition>
};

export default FadeSlide;
