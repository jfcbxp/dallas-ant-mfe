const js = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');
const reactHooks = require('eslint-plugin-react-hooks');
const prettier = require('eslint-plugin-prettier');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
	js.configs.recommended,
	prettierConfig,
	{
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsparser,
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				console: 'readonly',
				process: 'readonly',
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				global: 'readonly',
				module: 'readonly',
				require: 'readonly',
				exports: 'readonly',
				React: 'readonly',
				JSX: 'readonly',
			},
		},
		plugins: {
			'@typescript-eslint': tseslint,
			'react-hooks': reactHooks,
			'prettier': prettier,
		},
		rules: {
			'prettier/prettier': 'error',
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-alert': 'error',
			'no-eval': 'error',
			'no-implied-eval': 'error',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'no-undef': 'off',
			'no-redeclare': 'off',
			'@typescript-eslint/no-redeclare': 'error',
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': 'error',
			'prefer-const': 'error',
			'no-var': 'error',
			'prefer-arrow-callback': 'error',
			'object-shorthand': 'error',
			'prefer-template': 'error',
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'warn',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'eqeqeq': ['error', 'always'],
			'curly': 'off',
			'semi': ['error', 'always'],
			'no-empty': 'error',
			'no-unreachable': 'error',
			'no-duplicate-case': 'error',
			'no-fallthrough': 'error',
			'default-case': 'error',
		},
	},
	{
		ignores: ['.next/**', 'dist/**', 'node_modules/**', 'envs.js', 'commitlint.config.js', '.prettierrc.js', 'eslint.config.js'],
	},
];
