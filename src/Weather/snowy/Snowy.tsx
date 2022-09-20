import React from 'react';

import type { ComponentProps } from '@/types';

import './Snowy.less';

const Snowy: React.FC<ComponentProps> = ({ className = '' }) => {
	return (
		<div className={`snowy ${className}`}>
			<ul>
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
				<li />
			</ul>
			<span className={"snowe"} />
			<span className={"snowex"} />
			<span className={"stick"} />
			<span className={"stick2"} />
		</div>
	);
};

export default Snowy;
