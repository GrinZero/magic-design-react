import React from 'react';

import type { ComponentProps } from '@/types';

import './Cloudy.less';

const Cloudy: React.FC<ComponentProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <div className={'cloud'} />
      <div className={'cloudx'} />
    </div>
  );
};

export default Cloudy;
