import React, { useEffect } from 'react';

import { usePrevious, useSetState } from 'ahooks';

import type { ComponentProps } from '@/types';

import Cloudy from './cloudy/Cloudy';
import './index.less';
import Nighty from './nighty/Nighty';
import Rainy from './rainy/Rainy';
import Snowy from './snowy/Snowy';
import Sunny from './sunny/Sunny';

type WeatherType = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'nighty';

const WeatherTypeStore = {
	sunny: {
		class: 'weather-sunny',
		component: Sunny,
	},
	cloudy: {
		class: 'weather-cloudy',
		component: Cloudy,
	},
	rainy: {
		class: 'weather-rainy',
		component: Rainy,
	},
	snowy: {
		class: 'weather-snowy',
		component: Snowy,
	},
	nighty: {
		class: 'weather-nighty',
		component: Nighty,
	},
};

export interface WeatherProps extends ComponentProps {
	/**
	 * @description 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'nighty'
	 */
	type: WeatherType;
	/**
	 * @description 切换天气需要的时间
	 */
	duration?: number;
	/**
	 * @description 右上角天气图标的动画时间，默认是duration的一半
	 */
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
