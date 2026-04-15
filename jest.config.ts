import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const config: Config = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	collectCoverageFrom: [
		'src/hooks/**/*.{ts,tsx}',
		'src/utils/**/*.{ts,tsx}',
		'src/services/**/*.{ts,tsx}',
		'!**/*.test.{ts,tsx}',
		'!**/index.ts',
	],
};

export default createJestConfig(config);
