import React, { FC } from 'react';

import type { ComponentProps } from '@/types';

import './Sunny.less';

const Sunny: FC<ComponentProps> = ({ className = '' }) => {
	return (
		<div className={className}>
			<div className="sun" />
			<div className="sunx" />
		</div>
	);
};

export default Sunny;
