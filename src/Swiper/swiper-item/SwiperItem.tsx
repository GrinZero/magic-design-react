import React from 'react';

import type { ComponentProps } from '@/types';

export interface SwiperItemProps extends ComponentProps {
	children: React.ReactNode | React.ReactNode[];
	className?: string;
	[x: string]: any;
}

const SwiperItem: React.FC<SwiperItemProps> = ({ children, className = '', ...rest }) => {
	return (
		<div className={`mg-w-full mg-h-full ${className}`} {...rest}>
			{children}
		</div>
	);
};
SwiperItem.displayName = 'SwiperItem';

export default SwiperItem;
