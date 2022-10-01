# 列表 List

```tsx
/**
 * inline: true
 */
import React from 'react';
import { CheckBoxList } from '../../public';

const options = [
  {
    checked: true,
    label: '多方向动画适配',
  },
  {
    checked: false,
    label: '优化滑动时的跳动',
  },
];

const CheckBoxPage: React.FC<void> = () => <CheckBoxList options={options} />;
export default CheckBoxPage;
```

## Default

这是一个数据结构中的数组/列表结构，你可以通过 ref 从而像正常使用一个列表一样使用它。

```tsx
import { Button, Input } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { List } from 'magic-design-react';
import React, { useRef, useState } from 'react';

const useStyles = makeStyles({
  outLineContainer: {
    '& > *': {
      marginRight: '4px',
    },
    '&  .MuiInput-root': {
      color: 'var(--mg-theme-border)',
      '&::before': {
        borderBottom: '1px solid var(--mg-border-color)',
      },
    },
  },
});

const DemoDefault: React.FC<void> = () => {
  const classes = useStyles();
  const [code, setCode] = useState<string>('');
  const [outPut, setOutPut] = useState<any>([]);
  const [actionOutPut, setActionOutPut] = useState<[string | null, any]>([null, null]);

  const [dir, setDir] = useState('row');
  const ref = useRef<any>(null);

  const indexRef = useRef<any>();
  const indexValRef = useRef<any>();
  const spliceStartRef = useRef<any>();
  const spliceDeleteCountRef = useRef<any>();
  const spliceMoreRef = useRef<any>();

  const scrollRef = useRef<any>(null);
  const handlePush = () => {
    const value = ~~(Math.random() * 100) + 1;
    ref.current.push(value);
    setCode(`ref.current.push(${value})`);
  };
  const handleUnShift = () => {
    const value = ~~(Math.random() * 100) + 1;
    ref.current.unshift(value);
    setCode(`ref.current.unshift(${value})`);
  };
  const handlePop = () => {
    ref.current.pop();
    setCode(`ref.current.pop()`);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        behavior: 'smooth',
        top: 999999,
        left: 999999,
      });
    });
  };
  const handleShift = () => {
    ref.current.shift();
    setCode(`ref.current.shift()`);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        behavior: 'smooth',
        top: 0,
        left: 0,
      });
    });
  };
  const handleReset = () => {
    setCode(`ref.current.reset()`);
    setOutPut([]);
    ref.current.reset();
  };
  const handleOnValue = (value: number | null | undefined) => {
    value !== undefined && setOutPut((prev: any) => [...prev, value || -1]);
  };
  const handleChangeDir = () => {
    setDir(dir === 'row' ? 'col' : 'row');
  };
  const handleArrayIndex = () => {
    const index = Number(indexRef.current.value);
    const value = indexValRef.current.value || -1;
    ref.current.value[index] = value;
    setCode(`ref.current.value[${index}] = ${value}`);
  };
  const handleAction = (e: any) => {
    const { type } = e.target.dataset;
    switch (type) {
      case 'length':
      case 'value':
        setCode(`ref.current.${type}`);
        setActionOutPut([type, ref.current[type]]);
        break;
      default:
        setCode(`ref.current.${type}()`);
        setActionOutPut([type, ref.current[type]()]);
        break;
    }
  };
  const handleSplice = () => {
    const start = Number(spliceStartRef.current.value);
    const deleteCount = Number(spliceDeleteCountRef.current.value);
    const more = spliceMoreRef.current.value;
    const moreArr = more === '' ? [] : more.split(',').map((item: string) => Number(item));
    const result = ref.current.splice(start, deleteCount, ...moreArr);
    setCode(`ref.current.splice(${start}, ${deleteCount}, ${more})`);
    setActionOutPut(['splice', result]);
  };

  return (
    <div className="mg-container mg-scrollbar">
      <div className={`mg-flex mg-flex-${dir === 'row' ? 'col' : 'row'} mg-p-8 mg-justify-evenly`}>
        <List
          className={dir === 'row' ? 'mg-w-[600px] mg-h-[90px]' : 'mg-w-[90px] mg-h-[600px]'}
          ref={ref}
          onPop={handleOnValue}
          onShift={handleOnValue}
          direction={dir}
        />
        <div className="mg-flex mg-flex-col mg-ml-4">
          <div className="mg-flex mg-mt-2 mg-items-center mg-w-[600px] mg-overflow-hidden">
            <div className="mg-h-[50px] mg-p-[8px] mg-flex mg-items-center mg-justify-center mg-flex-shrink-0">
              OUTPUT
            </div>
            <div className="mg-flex mg-flex-1 mg-items-center mg-scrollbar" ref={scrollRef}>
              {outPut.map((item: any, index: number) => (
                <div className="mg-list__item mg-ml-2" key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="mg-flex mg-mt-2 mg-items-center mg-w-[600px] mg-overflow-hidden">
            <div className="mg-h-[50px] mg-p-[8px] mg-flex mg-items-center mg-justify-center mg-flex-shrink-0">
              ACTION
            </div>
            <div className="mg-flex mg-flex-1 mg-items-center">
              <div className="mg-list__item mg-ml-2" style={{ width: '100px' }}>
                {actionOutPut[0] ?? 'None'}
              </div>
              <div className="mg-list__item mg-ml-2 mg-px-2" style={{ minWidth: '100px', width: 'auto' }}>
                {actionOutPut[1]?.toString?.() ?? 'None'}
              </div>
            </div>
          </div>

          <div className="mg-flex mg-flex-col mg-mt-2 mg-w-[600px] mg-overflow-hidden">
            <div className="mg-p-[8px] mg-flex mg-flex-shrink-0">CODE</div>
            <div className="mg-flex mg-flex-1 mg-items-center mg-p-2 mg-bg-gray-800 mg-min-h-[60px] mg-text-white mg-rounded-md">
              {code}
            </div>
          </div>

          <div className="mg-flex mg-mt-2">
            <Button onClick={handlePush}>push</Button>
            <Button onClick={handlePop}>pop</Button>
            <Button onClick={handleUnShift}>unshift</Button>
            <Button onClick={handleShift}>shift</Button>
            <Button onClick={handleReset}>reset</Button>
          </div>
          <div className={`mg-mt-2 mg-flex ${classes.outLineContainer}`}>
            <Button onClick={handleChangeDir} variant="outlined">
              改变方向
            </Button>
            <Button variant="outlined" data-type="length" onClick={handleAction}>
              获取长度
            </Button>
            <Button variant="outlined" data-type="value" onClick={handleAction}>
              获取值
            </Button>
            <Button variant="outlined" data-type="reverse" onClick={handleAction}>
              反转列表
            </Button>
          </div>
          <div className={`mg-mt-2 mg-flex ${classes.outLineContainer}`}>
            <Button onClick={handleArrayIndex} variant="outlined">
              {'Array[index]=value操作'}
            </Button>
            <Input placeholder="Index" inputProps={{ ref: indexRef }}></Input>
            <Input placeholder="Value" inputProps={{ ref: indexValRef }}></Input>
          </div>

          <div className={`mg-mt-2 mg-flex ${classes.outLineContainer}`}>
            <Button onClick={handleSplice} variant="outlined">
              {'Splice操作'}
            </Button>
            <Input placeholder="Start" inputProps={{ ref: spliceStartRef }}></Input>
            <Input placeholder="DeleteCount" inputProps={{ ref: spliceDeleteCountRef }}></Input>
            <Input placeholder="1,2,3,4" inputProps={{ ref: spliceMoreRef }}></Input>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DemoDefault;
```

## Ref

```ts
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
```

<API src="./index.tsx"></API>
