# 栈 Stack

```tsx
/**
 * inline: true
 */
import React from 'react';
import { CheckBoxList } from '../../public';

const options = [
  {
    checked: false,
    label: '竖方向的栈',
  },
];

const CheckBoxPage: React.FC<void> = () => <CheckBoxList options={options} />;
export default CheckBoxPage;
```

## Default

这是一个数据结构中的栈结构

```tsx
import { Button } from '@mui/material';
import { Stack } from 'magic-design-react';
import React, { useRef, useState } from 'react';

const DemoDefault: React.FC<void> = () => {
  const [outPut, setOutPut] = useState<any>([]);
  const ref = useRef<any>(null);

  const scrollRef = useRef<any>(null);
  const handlePush = () => {
    ref.current.push(~~(Math.random() * 100) + 1);
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

  const handleReset = () => {
    setOutPut([]);
    ref.current.reset();
  };

  const handleOnPop = (value: any) => {
    setOutPut((prev: any) => [...prev, value]);
  };

  return (
    <div className="mg-flex mg-flex-col mg-p-8 mg-justify-evenly">
      <Stack className="mg-w-[600px] mg-h-[90px]" ref={ref} onPop={handleOnPop} />
      <div className="mg-flex mg-mt-2 mg-items-center mg-w-[600px] mg-overflow-hidden">
        <div className="mg-h-[50px] mg-p-[8px]  mg-flex mg-items-center mg-justify-center  mg-flex-shrink-0">
          OUTPUT
        </div>
        <div className="mg-flex mg-flex-1 mg-items-center mg-scrollbar" ref={scrollRef}>
          {outPut.map((item: any) => (
            <div className="mg-stack__item mg-ml-2">{item}</div>
          ))}
        </div>
      </div>
      <div className="mg-flex mg-mt-2">
        <Button onClick={handlePush}>push</Button>
        <Button onClick={handlePop}>pop</Button>
        <Button onClick={handleReset}>reset</Button>
      </div>
    </div>
  );
};
export default DemoDefault;
```

<API src="./index.tsx"></API>
