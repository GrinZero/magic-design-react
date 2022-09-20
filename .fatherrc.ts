import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
	esm: 'rollup',
	lessInRollupMode: {
		javascriptEnabled: true,
	},
	entry: ['./src/index.ts'],
	extraRollupPlugins: [
		resolve(),
		postcss({
			extract: true,
			plugins: [
				require('postcss-import'),
				require('tailwindcss')({
					config: './tailwind.config.js',
				}),
				require('autoprefixer'),
			],
		}),
	],
	autoprefixer: {
		browsers: ['ie>9', 'Safari >= 6'],
	},
};
