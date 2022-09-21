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
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { List } from 'magic-design-react';
import React, { useRef, useState } from 'react';

const useStyles = makeStyles({
  outLineContainer: {
    '& > button': {
      marginRight: '4px',
    },
  },
});

const DemoDefault: React.FC<void> = () => {
  const classes = useStyles();
  const [outPut, setOutPut] = useState<any>([]);
  const [actionOutPut, setActionOutPut] = useState<[string | null, any]>([null, null]);

  const [dir, setDir] = useState('row');
  const ref = useRef<any>(null);

  const scrollRef = useRef<any>(null);
  const handlePush = () => {
    ref.current.push(~~(Math.random() * 100) + 1);
  };
  const handleUnShift = () => {
    ref.current.unshift(~~(Math.random() * 100) + 1);
  };
  const handlePop = () => {
    ref.current.pop();
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
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        behavior: 'smooth',
        top: 0,
        left: 0,
      });
    });
  };
  const handleReset = () => {
    setOutPut([]);
    ref.current.reset();
  };
  const handleOnValue = (value: any) => {
    setOutPut((prev: any) => [...prev, value]);
  };
  const handleChangeDir = () => {
    setDir(dir === 'row' ? 'col' : 'row');
  };

  const handleAction = (e: any) => {
    const { type } = e.target.dataset;
    console.log(actionOutPut[1]);
    setActionOutPut([type, ref.current[type]()]);
  };

  return (
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

        <div className="mg-flex mg-mt-2">
          <Button onClick={handlePush}>push</Button>
          <Button onClick={handlePop}>pop</Button>
          <Button onClick={handleUnShift}>unshift</Button>
          <Button onClick={handleShift}>shift</Button>
          <Button onClick={handleReset}>reset</Button>
        </div>
        <div className={`mg-mt-2 mg-flex ${classes.outLineContainer}`}>
          <Button onClick={handleChangeDir} variant="outlined">
            Change direction
          </Button>
          <Button variant="outlined" data-type="isEmpty" onClick={handleAction}>
            isEmpty
          </Button>
          <Button variant="outlined" data-type="size" onClick={handleAction}>
            size
          </Button>
          <Button variant="outlined" data-type="getValue" onClick={handleAction}>
            getValue
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DemoDefault;
```

## Ref

```ts
interface ListRef<T> {
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
```

<API src="./index.tsx"></API>
