import postcss from 'rollup-plugin-postcss';

export default {
	esm: 'rollup',
	extractCSS: true,
	lessInRollupMode: {
		javascriptEnabled: true,
	},
	entry: ['./src/index.ts'],
	extraRollupPlugins: [
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
