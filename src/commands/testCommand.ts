import fs from "fs"
import { run } from "jest"
import path from "path"
import { output } from "../util/output"
import { project } from "../util/project"
import type { StepParams } from "../util/runSteps"

type TestOptions = {
	watch: boolean
	setupFile: string
}

type BabelPresetOptions = {
	typescriptSupport: boolean
	flowSupport: boolean
	transpileModules: string | boolean
	reactRefreshSupport: boolean
}

type BabelTransformOptions = {
	presets: Array<string | BabelPresetOptions>
}

export type JestConfig = Partial<{
	transform: {
		[glob: string]: [string, BabelTransformOptions] | string
	}
	moduleFileExtensions: string[]
	testPathIgnorePatterns: string[]
	setupFilesAfterEnv: string[]
	moduleNameMapper: {
		[glob: string]: string
	}
	testEnvironment: "jsdom" | "node"
}>

export function testCommand({
	watch,
	setupFile,
}: TestOptions): (stepParams: StepParams) => Promise<void> {
	return async ({ config }) => {
		let jestConfig: JestConfig = {
			transform: {
				"\\.[jt]sx?$": [
					"babel-jest",
					{
						presets: ["@babel/preset-react", "@babel/preset-env"],
					},
				],
			},
			moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
			moduleNameMapper: {
				"^.+\\.(css|less|scss)$": "babel-jest",
				"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
					path.resolve(__dirname, "assets", "file-mock.js"),
			},
			testPathIgnorePatterns: ["^.+\\.eslintrc\\.js$"],
			setupFilesAfterEnv: [
				path.resolve(__dirname, "assets", "react-testing-library.setup.js"),
			],
			testEnvironment: "jsdom",
		}

		if (typeof config.jest === "function") {
			const modifier = config.jest as (config: JestConfig) => JestConfig

			jestConfig = modifier(jestConfig)
		}

		if (setupFile) {
			const setupFilePath = project.resolvePath(setupFile)

			const warningText = `The specified setup file for the tests (${setupFilePath}) could not be found.`
			try {
				if (fs.existsSync(setupFilePath)) {
					if (jestConfig.setupFilesAfterEnv) {
						jestConfig.setupFilesAfterEnv.push(setupFilePath)
					}
				} else {
					output.warn(warningText)
				}
			} catch {
				output.warn(warningText)
			}
		}

		const args = []
		args.push("--config", JSON.stringify(jestConfig))
		if (watch) {
			args.push("--watch")
		}

		// args.push('--json'); // json output could be used for custom formatting

		await run(args)
	}
}
