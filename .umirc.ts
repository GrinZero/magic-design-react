import { defineConfig } from 'dumi';
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin';

export default defineConfig({
	title: 'magic-design-react',
	favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
	logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
	outputPath: 'docs-dist',
	mfsu: false,
	fastRefresh: {},
	theme: {
		'@primary-color': '#7FA1F7',
	},
	chainWebpack(config: any) {
		config.plugin('windicss').use(WindiCSSWebpackPlugin);
	},
});
