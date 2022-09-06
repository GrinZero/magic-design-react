## EnergtSphereLoading

```tsx
/**
 * inline: true
 */
import React from 'react';
import { CheckBoxList } from '../../public';

const options = [
	{
		checked: false,
		label: '延时不影响动画执行，作用于时间',
	},
];

const CheckBoxPage: React.FC<void> = () => <CheckBoxList options={options} />;
export default CheckBoxPage;
```

### Default

这是一个能量球，基于 mask 完成

```tsx
import { EnergtSphereLoading } from 'magic-design-react';
import React from 'react';

const DemoDefault: React.FC<void> = () => {
	return (
		<div className="mg-flex mg-p-8 mg-justify-evenly">
			<EnergtSphereLoading />
		</div>
	);
};
export default DemoDefault;
```

### DEMO

我们可以自由调节它的颜色、速度以及延迟

```tsx
import { EnergtSphereLoading } from 'magic-design-react';
import React from 'react';

const DemoIndex: React.FC<void> = () => {
	return (
		<div className="mg-flex mg-p-8 mg-justify-evenly">
			<EnergtSphereLoading color="#7fa1f7" speed="1s" />
			<EnergtSphereLoading color="#ed6e76" speed="2s" />
			<EnergtSphereLoading color="#7ff799" speed="3s" delay="3s" />
		</div>
	);
};
export default DemoIndex;
```

### MagicDemo

合适的参数可以构造出魔法的图形

```tsx
import { makeStyles } from '@mui/styles';
import { EnergtSphereLoading } from 'magic-design-react';
import React from 'react';

const useStyles = makeStyles({
	container: {
		height: '150px',
		'& > div': {
			position: 'absolute',
		},
	},
});

const DemoIndex: React.FC<void> = () => {
	const classes = useStyles();
	return (
		<div className={`mg-flex mg-p-8 mg-justify-evenly mg-relative ${classes.container}`}>
			<EnergtSphereLoading color="#7fa1f7" speed="1s" delay="0.3s" />
			<EnergtSphereLoading color="#ed6e76" speed="1s" delay="0.6s" />
			<EnergtSphereLoading color="#7ff799" speed="1s" delay="0.9s" />
		</div>
	);
};
export default DemoIndex;
```
