import { ComponentProps } from '@/types';
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
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
  onPop?: (item: T | undefined, from?: 'clear') => void;
  /**
   * @description shift时触发，shift是异步的，因为动画是异步的
   */
  onShift?: (item: T | undefined, from?: 'clear') => void;
}

export interface ListRef<T = unknown> {
  push: (item: T) => void;
  pop: () => T;
  shift: () => T;
  unshift: (item: T) => void;
  reverse: () => void;
  splice: (start: number, deleteCount?: number, ...items: T[]) => T[];
  length: number;
  value: T[];
}

export interface ListRefExtension<T = unknown> {
  reset: () => void;
  setData: (list: T[]) => void;
}

const inClassMap = {
  queuerow: 'animate__fadeInLeft',
  queuecol: 'animate__fadeInUp',
  stackrow: 'animate__fadeInRight',
  stackcol: 'animate__fadeInDown',
  splicecol: 'animate__fadeInDown',
  splicerow: 'animate__fadeInDown',
};

const outClassMap = {
  stackrow: 'animate__fadeOutRight',
  stackcol: 'animate__fadeOutUp',
  queuerow: 'animate__fadeOutLeft',
  queuecol: 'animate__fadeOutDown',
  splicecol: 'animate__fadeOutLeft',
  splicerow: 'animate__fadeOutDown',
};

const getID = () => `${Date.now()}-${~~(Math.random() * 10000)}`;

const List: React.ForwardRefRenderFunction<ListRef & ListRefExtension, ListProps> = (
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
  const animateType = useRef<'stack' | 'queue' | 'splice'>('stack');
  const domRef = useRef<HTMLDivElement>(null);

  const [addTask, clearTasks, getTasks] = useAsyncTaskList();

  const [outValue, setOutValue] = useState<string[]>([]);
  const [inValue, setInValue] = useState<string[]>([]);

  function handlePush<T>(item: T) {
    animateType.current = 'stack';
    const newID = getID();
    valStore.current[newID] = item;
    setList([...list, newID]);
    setInValue([newID]);
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
    setInValue([newID]);
    autoScroll &&
      requestAnimationFrame(() => {
        domRef.current?.scrollTo({
          behavior: 'smooth',
          top: 0,
          left: 0,
        });
      });
  }
  function handleSplice<T>(start: number, deleteCount = 0, ...items: T[]) {
    if (animateType.current !== 'splice') {
      setInValue([]);
      animateType.current = 'splice';
    }
    if (getTasks().length !== 0) {
      clearTasks();
    }
    const newList = [...list];
    const itemsList = items.map(() => getID());
    const outList = newList.splice(start, deleteCount, ...itemsList);
    setInValue(itemsList);
    setOutValue(outList);
    addTask(() => {
      setList(newList);
    }, 500);
    const outVal = outList.map((item) => valStore.current[item]);
    outList.forEach((item) => delete valStore.current[item]);
    items.forEach((item, index) => {
      valStore.current[newList[start + index]] = item;
    });
    addTask(() => {
      setInValue([]);
      setOutValue([]);
    }, 800);
    return outVal;
  }

  const handleShift = () => {
    if (animateType.current !== 'queue') {
      setInValue([]);
      animateType.current = 'queue';
    }
    if (getTasks().length !== 0) {
      clearTasks();
    }
    const outKey = list[0];
    const outVal = valStore.current[outKey];
    if (list.length === 0) {
      onShift?.(undefined);
      setOutValue([]);
      return;
    }
    setOutValue([outKey]);
    addTask(() => {
      const newList = [...list];
      list.shift();
      const lastItem = newList.shift();
      setList(newList);
      onShift?.(lastItem ? valStore.current[lastItem] : undefined);
      lastItem && delete valStore.current[lastItem];
    }, 500);
    addTask(() => {
      setOutValue([]);
    }, 800);
    return outVal;
  };
  const handlePop = () => {
    if (animateType.current !== 'stack') {
      setInValue([]);
      animateType.current = 'stack';
    }
    if (getTasks().length !== 0) {
      clearTasks();
    }
    const outKey = list[list.length - 1];
    const outVal = valStore.current[outKey];
    if (list.length === 0) {
      onPop?.(undefined);
      setOutValue([]);
    }
    setOutValue([outKey]);
    addTask(() => {
      const newList = [...list];
      // 提前同步
      list.pop();
      const lastItem = newList.pop();
      setList(newList);
      onPop?.(lastItem ? valStore.current[lastItem] : undefined);
      lastItem && delete valStore.current[lastItem];
    }, 500);
    addTask(() => {
      setOutValue([]);
    }, 800);
    return outVal;
  };
  const handleReset = () => {
    clearTasks();
    setList([]);
    setOutValue([]);
    setInValue([]);
    valStore.current = {};
  };

  const currentValue = list.map((item) => valStore.current[item]);
  const proxyValue = new Proxy(currentValue, {
    set(target, key: any, value: any) {
      const numKey = Number(key);
      if (!isNaN(numKey)) {
        const newID = getID();
        valStore.current[newID] = value;
        list[key] = newID;
        setList([...list]);
      }
      target[key] = value;
      return true;
    },
  });
  useImperativeHandle(ref, () => ({
    value: proxyValue,
    length: currentValue.length,
    reverse: () => setList([...list].reverse()),
    push: handlePush,
    pop: handlePop,
    reset: handleReset,
    shift: handleShift,
    unshift: handleUnShift,
    splice: handleSplice,
    setData<T>(value: T[]) {
      const valueList = value.map(() => getID());
      valStore.current = Object.fromEntries(value.map((item, index) => [valueList[index], item]));
      setList(valueList);
    },
  }));

  const inClass = `${inClassMap[`${animateType.current}${direction}`]} animate__animated`;
  const outClass = `${outClassMap[`${animateType.current}${direction}`]} animate__animated`;

  const classes = [defaultMargin ? (direction === 'row' ? 'mg-mr-2' : 'mg-mt-2') : ''].join(' ');

  const listEle = list.map((item) => {
    const baseClasses = `${classes} ${inValue.includes(item) ? inClass : ''} ${
      outValue.includes(item) ? outClass : ''
    }`;
    return render ? (
      <div className={baseClasses} key={item}>
        {render(valStore.current[item])}
      </div>
    ) : (
      <div className={`mg-list__item ${baseClasses}`} key={item}>
        {toString(valStore.current[item])}
      </div>
    );
  });

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
