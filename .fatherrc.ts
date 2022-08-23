import postcss from 'rollup-plugin-postcss';

export default {
	// more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
	// lessInBabelMode: true,
	esm: 'rollup',
	// cssModules: true,
	extractCSS: true,
	// runtimeHelpers: true,
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
