import type { ComponentProps } from '@/types';
import React from 'react';

import './index.less';

interface EnergtSphereProps extends ComponentProps {
	speed?: string;
	color?: string;
}

const EnergtSphereLoading: React.FC<EnergtSphereProps> = ({ className = '', speed = '.5s', color = '#52e1ef' }) => {
	const styles: any = {
		'--speed': speed,
		'--color': color,
	};
	return (
		<div className={`enregt-sphere-loading animate__animated ${className}`} style={styles}>
			<div className="enregt-sphere-loading__main" />
			<div className="enregt-sphere-loading__ball" />
		</div>
	);
};

export default EnergtSphereLoading;
