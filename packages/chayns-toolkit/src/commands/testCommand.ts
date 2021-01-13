import jest from 'jest';
import createBabelPresetOptions from "../util/createBabelPresetOptions"
import { loadPackageJson } from "../util/loadPackageJson"

type TestOptions = {
    watch: boolean;
}

export async function testCommand({
    watch,
}: TestOptions): Promise<void> {
	const packageJson = await loadPackageJson();
	const babelConfig = createBabelPresetOptions({
		packageJson,
		transpileModules: 'commonjs',
	});

	const jestConfig = {
		transform: {
			'\\.[jt]sx?$': ['babel-jest', {
				presets: [["@chayns-toolkit", babelConfig]],
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
	if (watch) {
	    args.push('--watch');
    }

	// args.push('--json'); // json output could be used for custom formatting

	await jest.run(args);
}
