import jest from 'jest';
import fs from 'fs';
import path from 'path';

import createBabelPresetOptions from "../util/createBabelPresetOptions"
import { loadPackageJson } from "../util/loadPackageJson"
import { project } from '../util/project';
import { output } from "../util/output"

type TestOptions = {
    watch: boolean;
    setupFile: string;
}

type JestConfig = {
    transform?: {
        [glob: string]: [string, any] | string;
    };
    moduleFileExtensions?: string[];
    testPathIgnorePatterns?: string[];
    setupFilesAfterEnv?: string[];
};

export async function testCommand({
    watch,
    setupFile,
}: TestOptions): Promise<void> {
	const packageJson = await loadPackageJson();
	const babelConfig = createBabelPresetOptions({
		packageJson,
		transpileModules: 'commonjs',
	});

	const jestConfig: JestConfig = {
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
        setupFilesAfterEnv: [
            path.resolve(__dirname, 'assets', 'react-testing-library.setup.js'),
        ],
	};

    if (setupFile) {
        const setupFilePath = project.resolvePath(setupFile);

        const warningText = `The specified setup file for the tests (${setupFilePath}) could not be found.`;
        try {
            if (fs.existsSync(setupFilePath)) {
                if (jestConfig.setupFilesAfterEnv) {
                    jestConfig.setupFilesAfterEnv.push(setupFilePath);
                }
            } else {
                output.warn(warningText);
            }
        } catch (ex) {
            output.warn(warningText);
        }
    }

	const args = [];
	args.push('--config', JSON.stringify(jestConfig));
	if (watch) {
	    args.push('--watch');
    }

	// args.push('--json'); // json output could be used for custom formatting

	await jest.run(args);
}
