import { ComponentProps } from '@/types';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './index.less';

import { useAsyncTaskList } from '@/hooks';

export interface StackProps extends ComponentProps {
  defaultValue?: unknown[];
  /**
   * @description 在栈底/栈头渲染内容
   */
  headRender?: () => React.ReactNode;
  /**
   * @description 在栈顶/栈尾渲染内容
   */
  tailRender?: () => React.ReactNode;
  /**
   * @description 允许自定义单元格，但是你还是得写keyOfItem
   */
  render?: (item: unknown) => React.ReactNode;
  /**
   * @description 得到item的key
   */
  keyOfItem?: (item: unknown) => string;
  direction?: 'col' | 'row';
  defaultMargin?: boolean;
  autoScroll?: boolean;
  /**
   * @description pop时触发，pop是异步的，因为动画是异步的
   */
  onPop?: (item: unknown) => void;
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
    onPop,
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

  const [addTask, clearTasks, tasks] = useAsyncTaskList();

  const [outValue, setOutValue] = useState<unknown>(null);

  useEffect(() => {
    if (outValue !== null) {
      addTask(() => {
        const newStack = [...stack];
        const lastItem = newStack.pop();
        setStack(newStack);
        onPop?.(lastItem);
        return lastItem;
      }, 500);
      addTask(() => {
        setOutValue(null);
      }, 800);
    }
  }, [outValue]);

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
    if (tasks.length !== 0) {
      clearTasks();
    }
    setOutValue(stack[stack.length - 1]);
    return stack[stack.length - 1];
  };

  const handleReset = () => {
    clearTasks();
    setStack([]);
  };

  useImperativeHandle(ref, () => ({
    getValue: () => stack,
    size: () => stack.length,
    push: handlePush,
    pop: handlePop,
    peek: () => stack[stack.length - 1],
    isEmpty: () => stack.length === 0,
    reset: handleReset,
  }));

  const classes = [
    'animate__animated',
    defaultMargin ? (direction === 'row' ? 'mg-mr-2' : 'mg-mt-2') : '',
    direction === 'row' ? 'animate__fadeInRight' : 'animate__fadeInUp',
  ].join(' ');

  const outClass = direction === 'row' ? 'animate__fadeOutRight' : 'animate__fadeOutUp';

  const stackEle = stack.map((item) =>
    render ? (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <div className={`${classes} ${item === outValue ? outClass : ''}`} key={keyOfItem?.(item) ?? item?.toString()}>
        {render(item)}
      </div>
    ) : (
      <div
        className={`mg-stack__item ${classes} ${item === outValue ? outClass : ''}`}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        key={keyOfItem?.(item) ?? item?.toString()}
      >
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item?.toString()
        }
      </div>
    ),
  );

  return (
    <div className={`mg-scrollbar mg-stack mg-flex mg-flex-${direction} ${className}`} ref={domRef}>
      {headRender?.()}
      {stackEle}
      {tailRender?.()}
    </div>
  );
};

export default forwardRef(Stack);
