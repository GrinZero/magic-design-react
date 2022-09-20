import React from 'react';

import type { ComponentProps } from '@/types';

import './Rainy.less';

const Rainy: React.FC<ComponentProps> = ({ className = '' }) => {
	return (
		<div className={`rainy ${className}`}>
			<ul>
				<li />
				<li />
				<li />
				<li />
				<li />
			</ul>
			<span className={'rainy-cloud'} />
		</div>
	);
};

export default Rainy;
