import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import './CheckBoxList.less';

interface CheckBoxListOption {
	label: string | boolean | number;
	checked: boolean;
}

interface CheckBoxListProps {
	options: Array<CheckBoxListOption>;
}

const CheckBoxList: React.FC<CheckBoxListProps> = ({ options }) => {
	return (
		<div className="mg-flex mg-flex-col mg-checkboxlist-container">
			{options.map(({ checked, label }, index) => (
				<FormControlLabel key={index} control={<Checkbox checked={checked} />} label={label} />
			))}
		</div>
	);
};

export default CheckBoxList;
