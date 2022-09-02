import type { ComponentProps } from '@/types';
import { Switch } from '@mui/material';
import React, { useState } from 'react';
import './ThemeSwitch.less';

interface ThemeSwitchProps extends ComponentProps {
	theme?: 'dark' | 'light';
	defaultTheme?: 'light' | 'dark';
	onChange?: (theme: string) => void;
}
const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ theme, defaultTheme = 'dark', onChange }) => {
	const [curTheme, setCurTheme] = useState(defaultTheme);

	const currentTheme = theme || curTheme;

	return (
		<span className="mg-theme-switch__container">
			<Switch
				className={`mg-theme-switch mg-theme-switch__${currentTheme} mg-theme-switch__custom-${currentTheme}`}
				checked={currentTheme === 'dark'}
				onChange={(event) => {
					const newTheme = event.target.checked ? 'dark' : 'light';
					setCurTheme(newTheme);
					onChange?.(newTheme);
				}}
			/>
		</span>
	);
};

export default ThemeSwitch;
