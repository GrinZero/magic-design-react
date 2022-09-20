import { ComponentProps } from '@/types';
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './index.less';

import { toString } from '@/utils';

import { useAsyncTaskList } from '@/hooks';

export interface ListProps<T = unknown> extends ComponentProps {
  defaultValue?: T[];
  /**
   * @description 在列表头部渲染内容
   */
  headRender?: () => React.ReactNode;
  /**
   * @description 在列表尾部渲染内容
   */
  tailRender?: () => React.ReactNode;
  /**
   * @description 允许自定义单元格
   */
  render?: (item: T, id?: string) => React.ReactNode;
  direction?: 'col' | 'row';
  defaultMargin?: boolean;
  autoScroll?: boolean;
  /**
   * @description pop时触发，pop是异步的，因为动画是异步的
   */
  onPop?: (item: T | undefined) => void;
  /**
   * @description shift时触发，shift是异步的，因为动画是异步的
   */
  onShift?: (item: T | undefined) => void;
}

export interface ListRef<T = unknown> {
  push: (item: T) => void;
  pop: () => T;
  shift: () => T;
  unshift: (item: T) => void;
  peek: () => T;
  isEmpty: () => boolean;
  size: () => number;
  getValue: () => T[];
  reset: () => void;
}

const inClassMap = {
  queuerow: 'animate__fadeInLeft',
  queuecol: 'animate__fadeInUp',
  stackrow: 'animate__fadeInRight',
  stackcol: 'animate__fadeInDown',
};

const outClassMap = {
  stackrow: 'animate__fadeOutRight',
  stackcol: 'animate__fadeOutUp',
  queuerow: 'animate__fadeOutLeft',
  queuecol: 'animate__fadeOutDown',
};

const getID = () => `${Date.now()}-${~~(Math.random() * 10000)}`;

const List: React.ForwardRefRenderFunction<ListRef, ListProps> = (
  {
    className = '',
    defaultValue = [],
    onPop,
    onShift,
    render,
    tailRender,
    headRender,
    direction = 'row',
    defaultMargin = true,
    autoScroll = true,
  },
  ref = null,
) => {
  const defaultList = defaultValue.map(() => getID());
  const valStore = useRef<Record<string, unknown>>(
    Object.fromEntries(defaultValue.map((item, index) => [defaultList[index], item])),
  );
  const [list, setList] = useState(defaultList);
  const animateType = useRef<'stack' | 'queue'>('stack');
  const domRef = useRef<HTMLDivElement>(null);

  const [addTask, clearTasks, tasks] = useAsyncTaskList();

  const [outValue, setOutValue] = useState<string | null>(null);
  const [inValue, setInValue] = useState<string | null>(null);

  useEffect(() => {
    if (outValue !== null) {
      if (list.length === 0) {
        animateType.current === 'stack' ? onPop?.(undefined) : onShift?.(undefined);
        setOutValue(null);
        return;
      }
      addTask(() => {
        const newList = [...list];
        const lastItem = animateType.current === 'queue' ? newList.shift() : newList.pop();
        setList(newList);
        animateType.current === 'stack'
          ? onPop?.(lastItem ? valStore.current[lastItem] : undefined)
          : onShift?.(lastItem ? valStore.current[lastItem] : undefined);
        lastItem && delete valStore.current[lastItem];
      }, 500);
      addTask(() => {
        setOutValue(null);
      }, 800);
    }
  }, [outValue]);

  function handlePush<T>(item: T) {
    animateType.current = 'stack';
    const newID = getID();
    valStore.current[newID] = item;
    setList([...list, newID]);
    setInValue(newID);
    autoScroll &&
      requestAnimationFrame(() => {
        domRef.current?.scrollTo({
          behavior: 'smooth',
          top: 999999,
          left: 999999,
        });
      });
  }
  function handleUnShift<T>(item: T) {
    animateType.current = 'queue';
    const newID = getID();
    valStore.current[newID] = item;
    setList([newID, ...list]);
    setInValue(newID);
    autoScroll &&
      requestAnimationFrame(() => {
        domRef.current?.scrollTo({
          behavior: 'smooth',
          top: 0,
          left: 0,
        });
      });
  }
  const handleShift = () => {
    if (animateType.current !== 'queue') {
      setInValue(null);
      animateType.current = 'queue';
    }
    animateType.current = 'queue';
    if (tasks.length !== 0) {
      clearTasks();
    }
    const outKey = list[0];
    const outVal = valStore.current[outKey];
    setOutValue(outKey);
    return outVal;
  };
  const handlePop = () => {
    if (animateType.current !== 'stack') {
      setInValue(null);
      animateType.current = 'stack';
    }
    if (tasks.length !== 0) {
      clearTasks();
    }
    const outKey = list[list.length - 1];
    const outVal = valStore.current[outKey];
    setOutValue(outKey);
    return outVal;
  };
  const handleReset = () => {
    clearTasks();
    setList([]);
    setOutValue(null);
    valStore.current = {};
  };

  useImperativeHandle(ref, () => ({
    getValue: () => list.map((item) => valStore.current[item]),
    size: () => list.length,
    push: handlePush,
    pop: handlePop,
    peek: () => valStore.current[list[list.length - 1]],
    isEmpty: () => list.length === 0,
    reset: handleReset,
    shift: handleShift,
    unshift: handleUnShift,
  }));

  const inClass = `${inClassMap[`${animateType.current}${direction}`]} animate__animated`;
  const outClass = `${outClassMap[`${animateType.current}${direction}`]} animate__animated`;

  const classes = [defaultMargin ? (direction === 'row' ? 'mg-mr-2' : 'mg-mt-2') : ''].join(' ');

  const listEle = list.map((item) =>
    render ? (
      <div className={`${classes} ${item === inValue ? inClass : ''} ${item === outValue ? outClass : ''}`} key={item}>
        {render(valStore.current[item])}
      </div>
    ) : (
      <div
        className={`mg-list__item ${classes} ${item === inValue ? inClass : ''} ${item === outValue ? outClass : ''}`}
        key={item}
      >
        {toString(valStore.current[item])}
      </div>
    ),
  );

  return (
    <div
      className={`mg-scrollbar mg-list mg-flex ${
        direction === 'row' ? 'mg-flex-row' : 'mg-flex-col-reverse'
      } ${className}`}
      ref={domRef}
    >
      {headRender?.()}
      {listEle}
      {tailRender?.()}
    </div>
  );
};

export default forwardRef(List);
