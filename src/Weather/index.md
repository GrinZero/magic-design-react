# Weather

```tsx
/**
 * inline: true
 */
import React from 'react';
import { CheckBoxList } from '../public';

const options = [
	{
		checked: true,
		label: '天气切换动画',
	},
	{
		checked: false,
		label: '不同天气不同切换动画',
	},
];

export default () => {
	return <CheckBoxList options={options} />;
};
```

### 1 All

以下是所有的天气效果～

```tsx
import React from 'react';
import { Weather } from 'magic-design-react';

const WeatherAllSection = () => {
	return (
		<div className="mg-flex mg-items-center mg-justify-center mg-flex-nowrap mg-w-full">
			<Weather className="mg-mr-6" type="sunny" />
			<Weather className="mg-mr-6" type="rainy" />
			<Weather className="mg-mr-6" type="snowy" />
			<Weather className="mg-mr-6" type="cloudy" />
			<Weather className="mg-mr-6" type="nighty" />
		</div>
	);
};

export default WeatherAllSection;
```

### 2 Weather

```tsx
import React, { useState } from 'react';
import { Weather } from 'magic-design-react';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';

const options = ['sunny', 'rainy', 'snowy', 'cloudy', 'nighty'];

const WeatherChangeSection = () => {
	const [type, setType] = useState('sunny');
	const handleChange = (e: any) => {
		console.log('handleChange', e);
		setType(e.target.value);
	};
	return (
		<div className="mg-flex mg-items-center mg-justify-evenly mg-flex-nowrap mg-w-full">
			<Weather className="mg-mr-6" type={type} />
			<RadioGroup defaultValue={options[0]} onChange={handleChange}>
				{options.map((item) => (
					<FormControlLabel key={item} value={item} control={<Radio />} label={item} />
				))}
			</RadioGroup>
		</div>
	);
};

export default WeatherChangeSection;
```
