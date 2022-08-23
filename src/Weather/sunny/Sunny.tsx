import React from 'react';

import type { ComponentProps } from '@/types';

import './Sunny.less';

const Sunny: React.FC<ComponentProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <div className={'sun'} />
      <div className={'sunx'} />
    </div>
  );
};

export default Sunny;
