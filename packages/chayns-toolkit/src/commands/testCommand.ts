import jest from 'jest';
import path from 'path';

export async function testCommand(): Promise<void> {
	const jestConfig = {
		transform: {
			'\\.[jt]sx?$': ['babel-jest', {
				presets: [["@chayns-toolkit", {
					transpileModules: 'commonjs',
				}]],
			}],
		},
		moduleFileExtensions: [
			'ts',
			'tsx',
			'js',
			'jsx',
		],
		testPathIgnorePatterns: ["^.+\\.eslintrc\\.js$"],
	};

	const args = [];
	args.push('--config', JSON.stringify(jestConfig));
	args.push('--json');

	await jest.run(args);
}