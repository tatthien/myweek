const formKitTailwind = require('@formkit/themes/tailwindcss') // eslint-disable-line

module.exports = {
	plugins: [formKitTailwind],
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'formkit.config.js'],
	theme: {
		fontFamily: {
			inter: ['Inter', 'sans-serif'],
		},
	},
	variants: {
		extend: {
			scale: ['focus'],
		},
	},
}
