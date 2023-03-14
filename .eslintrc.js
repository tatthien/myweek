module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 2020,
		parser: '@typescript-eslint/parser',
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['import'],
	rules: {
		'vue/multi-word-component-names': 'off',
		'vue/html-indent': ['error', 'tab'],
		'@typescript-eslint/no-explicit-any': 'off',
	},
	settings: {
		'import/resolver': {
			typescript: true,
		},
	},
}
