import type { ComponentProps } from '@/types';
import React from 'react';

import type { SwiperItemProps } from './swiper-item/SwiperItem';

type SwiperItemNode = React.ReactElement<React.FC<SwiperItemProps> & { className?: string; [key: string]: any }>;
export interface SwiperProps extends ComponentProps {
	interval?: number;
	duration?: number;
	autoplay?: boolean;
	current?: number;
	defaultCurrent?: number;
	children: SwiperItemNode | SwiperItemNode[];
}
