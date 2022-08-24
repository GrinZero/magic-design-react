// import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';

export default {
	esm: 'rollup',
	extractCSS: true,
	lessInRollupMode: {
		javascriptEnabled: true,
	},
	entry: ['./src/index.ts'],
	extraRollupPlugins: [
		peerDepsExternal(),
		resolve(),
		// commonjs(),
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
	extraExternals: ['react', 'react-dom'],
	autoprefixer: {
		browsers: ['ie>9', 'Safari >= 6'],
	},
};
