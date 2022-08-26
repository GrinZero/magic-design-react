import { defineConfig } from 'dumi';

export default defineConfig({
	// mode: 'site',
	mode: 'doc',
	base: '/magic-design-react',
	publicPath: '/magic-design-react/',
	// navs: [
	// 	{
	// 		title: 'components',
	// 		path: '/components',
	// 	},
	// 	{
	// 		title: 'github',
	// 		path: 'https://github.com/umijs/dumi',
	// 	},
	// ],
	// menus: {
	// 	'/components': [
	// 		{
	// 			title: 'Swiper',
	// 			path: '/swiper',
	// 		},
	// 	],
	// },
	exportStatic: {},
	title: 'magic-design-react',
	favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
	logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
	outputPath: 'docs',
	mfsu: {},
	theme: {
		'@primary-color': '#7FA1F7',
	},
	extraPostCSSPlugins: [
		require('postcss-import'),
		require('tailwindcss')({
			config: './tailwind.config.js',
		}),
		require('autoprefixer'),
	],
});
