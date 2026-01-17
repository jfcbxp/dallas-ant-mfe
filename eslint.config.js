import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
	js.configs.recommended,
	prettierConfig,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
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
			// Prettier
			'prettier/prettier': 'error',

			// Code Quality
			'no-console': 'warn',
			'no-debugger': 'error',
			'no-alert': 'error',
			'no-eval': 'error',
			'no-implied-eval': 'error',

			// Variables
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'no-undef': 'off',
			'no-redeclare': 'off',
			'@typescript-eslint/no-redeclare': 'error',
			'no-shadow': 'off',
			'@typescript-eslint/no-shadow': 'error',

			// Functions
			'prefer-const': 'error',
			'no-var': 'error',
			'prefer-arrow-callback': 'error',

			// Objects/Arrays
			'object-shorthand': 'error',
			'prefer-template': 'error',

			// TypeScript specific
			'@typescript-eslint/no-explicit-any': 'warn',
			'@typescript-eslint/no-non-null-assertion': 'warn',

			// React/JSX
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',

			// Code Style
			'eqeqeq': ['error', 'always'],
			'curly': ['error', 'all'],
			'semi': ['error', 'always'],

			// Error Prevention
			'no-empty': 'error',
			'no-unreachable': 'error',
			'no-duplicate-case': 'error',
			'no-fallthrough': 'error',
			'default-case': 'error',
		},
	},
	{
		ignores: ['.next/**', 'dist/**', 'node_modules/**', '.prettierrc.js'],
	},
];
