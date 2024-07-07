# Check 打勾

```tsx
/**
 * inline: true
 */
import React from 'react';
import { CheckBoxList } from '../../public';

const options = [
  {
    checked: true,
    label: '打勾动画',
  },
];

const CheckBoxPage: React.FC<void> = () => <CheckBoxList options={options} />;
export default CheckBoxPage;
```

## Default

这是一个携带打勾动画的 icon，常用于表单提交成功提示。尝试点击触发动画。

```tsx
import { Checked } from 'magic-design-react';
import React, { useState } from 'react';

const DemoDefault: React.FC<void> = () => {
  const [checked, setChecked] = useState(true);
  return (
    <div
      className="mg-flex mg-p-8 mg-justify-evenly"
      style={{
        fontSize: 120,
        color: '#7fa1f7',
      }}
      onClick={() => setChecked(!checked)}
    >
      <Checked className="mg-text-[120px]" checked={checked} />
    </div>
  );
};
export default DemoDefault;
```
