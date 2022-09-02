## ThemeSwitch

```tsx
/**
 * inline: true
 */
import React from 'react';
import { CheckBoxList } from '../../public';

const options = [
	{
		checked: true,
		label: 'Light/Dark',
	},
];

const CheckBoxPage: React.FC<void> = () => <CheckBoxList options={options} />;
export default CheckBoxPage;
```

### default

```tsx
import { ThemeSwitch } from 'magic-design-react';
import React from 'react';

const ThemeSwitchIndex: React.FC<void> = () => {
	return (
		<div className="mg-flex mg-flex-row">
			<ThemeSwitch defaultTheme="light" />
			<ThemeSwitch defaultTheme="dark" />
		</div>
	);
};
export default ThemeSwitchIndex;
```

### custom

```tsx
import { makeStyles } from '@mui/styles';
import { ThemeSwitch } from 'magic-design-react';
import React from 'react';

const useStyles = makeStyles({
	container: {
		'& .mg-theme-switch__light': {
			'--switch-thumb-bg-color': '#003892',
		},
		'& .mg-theme-switch__dark': {
			'--switch-bg-color': '#55585d',
			'--switch-thumb-bg-color': '#001e3c',
		},
	},
});

const ThemeSwitchIndex: React.FC<void> = () => {
	const classes = useStyles();
	return (
		<div className={`mg-flex mg-flex-col ${classes.container}`}>
			<div className="mg-flex mg-items-center">
				<ThemeSwitch defaultTheme="light" />
			</div>
		</div>
	);
};
export default ThemeSwitchIndex;
```

<API src="./ThemeSwitch.tsx"></API>
