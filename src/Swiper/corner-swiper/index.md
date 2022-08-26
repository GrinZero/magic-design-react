## CornerSwiper

```tsx
/**
 * inline: true
 */
import React from 'react';
import { CheckBoxList } from '../../public';

const options = [
	{
		checked: false,
		label: '100%',
	},
];

const CheckBoxPage: React.FC<void> = () => <CheckBoxList options={options} />;
export default CheckBoxPage;
```

This is corner swiper

### DEMO

```tsx
import { makeStyles } from '@mui/styles';
import { CornerSwiper, SwiperItem } from 'magic-design-react';
import React, { useState } from 'react';

import firstPng from '@/assets/images/stories/swiperBanner1.png';
import secondPng from '@/assets/images/stories/swiperBanner2.png';
import thirdPng from '@/assets/images/stories/swiperBanner3.png';

const useStyles = makeStyles({
	button: {
		backgroundColor: '#7fa1f7',
	},
});
const imgList = [
	{
		src: firstPng,
		alt: 'firstPng',
	},
	{
		src: secondPng,
		alt: 'secondPng',
	},
	{
		src: thirdPng,
		alt: 'thirdPng',
	},
	{
		src: firstPng,
		alt: 'forthPng',
	},
];

const CornerSwiperIndex: React.FC<void> = () => {
	const classes = useStyles();
	const [current, setCurrent] = useState(0);
	const handleClick = () => {
		setCurrent(current + 1 >= imgList.length ? 0 : current + 1);
	};
	return (
		<div className="mg-w-full mg-h-full mg-overflow-visible mg-flex mg-flex-col mg-items-center mg-justify-center mg-relative">
			<CornerSwiper current={current}>
				{imgList.map((item) => (
					<SwiperItem
						key={item.alt}
						className={`mg-w-[180px] mg-h-[120px]  mg-rounded-lg mg-overflow-hidden`}
						onClick={() => setCurrent(0)}
					>
						<img className={`mg-w-full mg-h-full mg-object-cover`} alt={item.alt} src={item.src} />
					</SwiperItem>
				))}
			</CornerSwiper>
			<div
				className={`mg-mt-6 mg-transition-all mg-w-96 mg-flex mg-items-center mg-justify-center mg-px-2 mg-py-4 mg-rounded-xl mg-cursor-pointer mg-text-white hover:mg-shadow-md hover:mg-shadow-blue-300 ${classes['button']}`}
				onClick={handleClick}
				onKeyDown={handleClick}
			>
				Click to change current
			</div>
		</div>
	);
};
export default CornerSwiperIndex;
```

<API src="./CornerSwiper.tsx"></API>
