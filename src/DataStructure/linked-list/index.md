# 链表 LinkedList

## Default

```tsx
import { LinkedList } from 'magic-design-react';
import React from 'react';

const head = {
  val: 123,
  next: {
    val: 456,
    next: {
      val: 789,
      next: null,
    },
  },
};

const Default: React.FC<void> = () => {
  return <LinkedList head={head}></LinkedList>;
};

export default Default;
```
