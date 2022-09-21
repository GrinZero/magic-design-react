# magic-design-react

> A component library that can achieve magic effects

你可以在 React 项目中引入本项目从而实现特定的魔法效果

## Start

```bash
pnpm add magic-design-react
```

## Usage

引入基本样式

### App.tsx

```tsx
import 'magic-design-react/dist/magic-design-react.css';
```

### index.tsx

默认支持 ESM 导出，可以被 tree-shaking 优化

```tsx
import { Weather } from 'magic-design-react';
import React from 'react';

const Page: React.FC<void> = () => {
  return (
    <div className="Page">
      <Weather />
    </div>
  );
};
export default Page;
```

## Caveats

`magic-design-react` 依赖 `react` 和 `react-dom`，请确保你的项目中已经安装了这两个依赖。

持续更新中～有更好玩的需求欢迎提 issue 踢我
