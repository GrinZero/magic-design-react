import React from 'react';

import type { ComponentProps } from '@/types';

import './Nighty.less';

const Nighty: React.FC<ComponentProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      <div className={'night'}>
        <span className={'moon'} />
        <span className={'spot1'} />
        <span className={'spot2'} />
        <ul>
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    </div>
  );
};

export default Nighty;
