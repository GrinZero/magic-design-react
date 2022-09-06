import type { ComponentProps } from '@/types';
import React from 'react';

import './index.less';

interface EnergtSphereProps extends ComponentProps {
	speed?: string;
	color?: string;
	delay?: string;
}

const EnergtSphereLoading: React.FC<EnergtSphereProps> = ({
	className = '',
	speed = '.5s',
	color = '#52e1ef',
	delay = '0s',
}) => {
	const styles: any = {
		'--speed': speed,
		'--color': color,
		'--delay': delay,
	};
	return (
		<div className={`enregt-sphere-loading animate__animated ${className}`} style={styles}>
			<div className="enregt-sphere-loading__main" />
			<div className="enregt-sphere-loading__ball" />
		</div>
	);
};

export default EnergtSphereLoading;
