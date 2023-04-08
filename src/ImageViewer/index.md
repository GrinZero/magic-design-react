# 图片放大预览 ImageViewer

```tsx
/**
 * inline: true
 */
import React from 'react';
import { CheckBoxList } from '../public';

const options = [
  {
    checked: true,
    label: '图片放大',
  },
  {
    checked: true,
    label: '滚轮缩放',
  },
];

const CheckBoxPage: React.FC<void> = () => <CheckBoxList options={options} />;
export default CheckBoxPage;
```

## Default

这是一个 ImageViewer，常用于商城商品详情页用于图片局部放大查看

```tsx
import firstPng from '@/assets/images/stories/swiperBanner1.png';
import { ImageViewer } from 'magic-design-react';
import React from 'react';

const DemoDefault: React.FC<void> = () => {
  return (
    <div className="mg-flex mg-p-8 mg-justify-evenly">
      <ImageViewer
        src={firstPng}
        className="mg-w-[450px] mg-h-72"
        selectClassName="mg-w-36 mg-h-36"
        viewClassName="mg-w-36 mg-h-36"
      />
    </div>
  );
};
export default DemoDefault;
```

## WheelZoom 带滚轮缩放

这是一个 ImageViewer，常用于商城商品详情页用于图片局部放大查看

```tsx
import firstPng from '@/assets/images/stories/swiperBanner2.png';
import { ImageViewer } from 'magic-design-react';
import React from 'react';

const DemoDefault: React.FC<void> = () => {
  return (
    <div className="mg-flex mg-p-8 mg-justify-evenly">
      <ImageViewer
        src={firstPng}
        className="mg-w-[450px] mg-h-72"
        selectClassName="mg-w-20 mg-h-20"
        viewClassName="mg-w-36 mg-h-36"
        wheelZoom
      />
    </div>
  );
};
export default DemoDefault;
```
