module.exports = {
	mode: 'jit',
	prefix: 'mg-',
	purge: [
		'./*.html',
		'./src/*.{js,ts,jsx,tsx,md,mdx}',
		'./src/**/*.{js,ts,jsx,tsx,md,mdx}',
		'./src/**/**/*.{js,ts,jsx,tsx,md,mdx}',
		'./docs/*.{js,ts,jsx,tsx,md,mdx}',
		'./docs/**/*.{js,ts,jsx,tsx,md,mdx}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
