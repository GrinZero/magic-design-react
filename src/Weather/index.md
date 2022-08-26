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

const CheckBoxPage: React.FC<void> = () => <CheckBoxList options={options} />;
export default CheckBoxPage;
```

### 1 All

以下是所有的天气效果～

```tsx
/**
 * inline: true
 */
import { Weather } from 'magic-design-react';
import React from 'react';

const WeatherAllSection: React.FC<void> = () => {
	return (
		<div className="mg-container mg-p-8 mg-overflow-auto">
			<div className="mg-flex mg-items-center mg-flex-nowrap mg-w-full">
				<Weather className="mg-mr-6" type="sunny" />
				<Weather className="mg-mr-6" type="rainy" />
				<Weather className="mg-mr-6" type="snowy" />
				<Weather className="mg-mr-6" type="cloudy" />
				<Weather className="mg-mr-6" type="nighty" />
			</div>
		</div>
	);
};

export default WeatherAllSection;
```

这些分别对应`sunny` | `rainy` | `snowy` | `cloudy` | `nighty`

<API hideTitle></API>

### 2 Weather

```tsx
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { Weather } from 'magic-design-react';
import React, { useState } from 'react';

const options = ['sunny', 'rainy', 'snowy', 'cloudy', 'nighty'];

const WeatherChangeSection: React.FC<void> = () => {
	const [type, setType] = useState('sunny');
	const handleChange = (e: any) => {
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
