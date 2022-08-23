import React, { useEffect } from 'react';

import { usePrevious, useSetState } from 'ahooks';

import type { ComponentProps } from '@/types';

import Cloudy from './cloudy/Cloudy';
import './index.less';
import Nighty from './nighty/Nighty';
import Rainy from './rainy/Rainy';
import Snowy from './snowy/Snowy';
import Sunny from './sunny/Sunny';

enum WeatherType {
	sunny = 'sunny',
	cloudy = 'cloudy',
	rainy = 'rainy',
	snowy = 'snowy',
	nighty = 'nighty',
}

const WeatherTypeStore = {
	[WeatherType.sunny]: {
		class: 'weather-sunny',
		component: Sunny,
	},
	[WeatherType.cloudy]: {
		class: 'weather-cloudy',
		component: Cloudy,
	},
	[WeatherType.rainy]: {
		class: 'weather-rainy',
		component: Rainy,
	},
	[WeatherType.snowy]: {
		class: 'weather-snowy',
		component: Snowy,
	},
	[WeatherType.nighty]: {
		class: 'weather-nighty',
		component: Nighty,
	},
};

interface WeatherProps extends ComponentProps {
	type: WeatherType;
	duration?: number;
	iconDuration?: number;
}

const Weather: React.FC<WeatherProps> = ({ type, duration = 3600, iconDuration, className = '' }) => {
	const { class: typeClassName, component: Component } = WeatherTypeStore[type];
	const preType = usePrevious(type);
	const { component: PreComponent } = WeatherTypeStore[preType || type];

	const [animates, setAnimates] = useSetState({
		preClassName: '',
		curClassName: '',
	});

	useEffect(() => {
		if (!preType) {
			return;
		}
		// TODO:use different animations for different weather switches
		setAnimates({
			preClassName: 'animate__fadeOut',
			curClassName: 'animate__fadeIn',
		});
	}, [preType, type, setAnimates]);

	const style = { '--animate-duration': `${iconDuration ?? duration / 2}ms` };
	return (
		<div className={`weather-container ${typeClassName} ${className}`} style={style as any}>
			{preType ? <PreComponent className={`animate__animated ${animates.preClassName}`} /> : null}
			<Component className={`animate__animated ${animates.curClassName}`} />
		</div>
	);
};

export default Weather;
