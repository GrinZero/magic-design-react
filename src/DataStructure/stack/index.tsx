import { ComponentProps } from '@/types';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './index.less';

export interface StackProps extends ComponentProps {
  defaultValue?: unknown[];
  headRender?: () => React.ReactNode;
  tailRender?: () => React.ReactNode;
  render?: (item: unknown) => React.ReactNode;
  keyOfItem?: (item: unknown) => string;
  direction?: 'col' | 'row';
  defaultMargin?: boolean;
  autoScroll?: boolean;
}

export interface StackRef {
  push: (item: unknown) => void;
  pop: () => unknown;
  peek: () => unknown;
  isEmpty: () => boolean;
  size: () => number;
  getValue: () => unknown[];
  reset: () => void;
}

const Stack: React.ForwardRefRenderFunction<StackRef, StackProps> = (
  {
    className = '',
    defaultValue = [],
    render,
    keyOfItem,
    tailRender,
    headRender,
    direction = 'row',
    defaultMargin = true,
    autoScroll = true,
  },
  ref = null,
) => {
  const [stack, setStack] = useState<unknown[]>(defaultValue);

  const domRef = useRef<HTMLDivElement>(null);

  const handlePush = (item: unknown) => {
    setStack([...stack, item]);
    autoScroll &&
      requestAnimationFrame(() => {
        domRef.current?.scrollTo({
          behavior: 'smooth',
          top: 999999,
          left: 999999,
        });
      });
  };
  const handlePop = () => {
    const newStack = [...stack];
    const lastItem = newStack.pop();
    setStack(newStack);
    return lastItem;
  };

  useImperativeHandle(ref, () => ({
    getValue: () => stack,
    size: () => stack.length,
    push: handlePush,
    pop: handlePop,
    peek: () => stack[stack.length - 1],
    isEmpty: () => stack.length === 0,
    reset: () => setStack([]),
  }));

  const classes = [
    'mg-stack__item',
    'animate__animated',
    defaultMargin ? (direction === 'row' ? 'mg-mr-2' : 'mg-mt-2') : '',
    direction === 'row' ? 'animate__fadeInRight' : 'animate__fadeInUp',
  ].join(' ');

  return (
    <div className={`mg-scrollbar mg-stack mg-flex mg-flex-${direction} ${className}`} ref={domRef}>
      {headRender?.()}
      {stack.map(
        (item) =>
          render?.(item) ?? (
            <div className={classes} key={keyOfItem?.(item) ?? item?.toString()}>
              {item?.toString()}
            </div>
          ),
      )}
      {tailRender?.()}
    </div>
  );
};

export default forwardRef(Stack);
