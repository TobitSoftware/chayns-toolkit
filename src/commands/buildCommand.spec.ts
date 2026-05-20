import { beforeEach, expect, test, vi } from "vitest"
import { buildCommand } from "./buildCommand"
import type { RsbuildConfig } from "@rsbuild/core"
import type { StepParams } from "../util/runSteps"

const mocks = vi.hoisted(() => ({
	createRsbuild: vi.fn(),
	createWebpackConfig: vi.fn(),
	modifyWebpackConfig: vi.fn(),
	runCompiler: vi.fn(),
	output: {
		info: vi.fn(),
		error: vi.fn(),
		exit: vi.fn(),
	},
	readFileSync: vi.fn(),
}))

vi.mock("@rsbuild/core", () => ({
	createRsbuild: mocks.createRsbuild,
}))

vi.mock("../util/createWebpackConfig", () => ({
	createWebpackConfig: mocks.createWebpackConfig,
}))

vi.mock("../util/modifyWebpackConfig", () => ({
	modifyWebpackConfig: mocks.modifyWebpackConfig,
}))

vi.mock("../util/webpackPromises", () => ({
	runCompiler: mocks.runCompiler,
}))

vi.mock("../util/output", () => ({
	output: mocks.output,
}))

vi.mock("fs", () => ({
	default: {
		readFileSync: mocks.readFileSync,
	},
}))

const previewMock = vi.fn()

const createStepParams = (): StepParams => ({
	config: {
		development: {
			host: "localhost",
			port: 1234,
			ports: {
				client: 1234,
				server: 1235,
			},
			strictPort: true,
			cert: undefined,
			key: undefined,
		},
		output: {
			filename: undefined,
			singleBundle: false,
			serverSideRendering: false,
			path: "build",
			prefixCss: false,
			cssVersion: "4.2",
			exposeModules: undefined,
			reactRequiredVersions: undefined,
			disableReactSharing: false,
			reactRuntime: "classic",
			reactCompiler: undefined,
			entryPoints: {},
		},
		manifest: {
			host: false,
			module: false,
		},
		webpack: undefined,
	},
	packageJson: {
		name: "test-package",
	},
	packageManager: undefined,
})

beforeEach(() => {
	vi.clearAllMocks()
	previewMock.mockReset()
	mocks.createWebpackConfig.mockResolvedValue({})
	mocks.modifyWebpackConfig.mockImplementation(({ config }: { config: RsbuildConfig }) => config)
	mocks.createRsbuild.mockResolvedValue({
		preview: previewMock,
	})
	mocks.runCompiler.mockResolvedValue({
		hasErrors: () => false,
	})
	previewMock.mockResolvedValue({
		urls: ["http://localhost:1234"],
		port: 1234,
		server: {},
	})
	mocks.readFileSync.mockReturnValue(Buffer.from("cert"))
})

test("does not start preview server when preview is disabled", async () => {
	await buildCommand({ analyze: false, preview: false, watch: false })(createStepParams())

	expect(mocks.runCompiler).toHaveBeenCalledWith(expect.anything(), { watch: false })
	expect(previewMock).not.toHaveBeenCalled()
})

test("starts preview server with development server settings when preview is enabled", async () => {
	const params = createStepParams()
	params.config.development.cert = "./cert.pem"
	params.config.development.key = "./key.pem"

	await buildCommand({ analyze: false, preview: true, watch: true })(params)

	expect(mocks.readFileSync).toHaveBeenCalledWith("./cert.pem")
	expect(mocks.readFileSync).toHaveBeenCalledWith("./key.pem")
	expect(mocks.createRsbuild).toHaveBeenCalledWith({
		rsbuildConfig: {
			server: {
				host: "localhost",
				port: 1234,
				strictPort: true,
				https: {
					cert: Buffer.from("cert"),
					key: Buffer.from("cert"),
				},
			},
		},
	})
	expect(mocks.runCompiler).toHaveBeenCalledWith(expect.anything(), { watch: true })
	expect(previewMock).toHaveBeenCalledTimes(1)
	expect(mocks.output.info).toHaveBeenCalledWith("Preview is running at: http://localhost:1234")
})

test("starts preview server directly after a non-watch build", async () => {
	await buildCommand({ analyze: false, preview: true, watch: false })(createStepParams())

	expect(mocks.runCompiler).toHaveBeenCalledWith(expect.anything(), { watch: false })
	expect(previewMock).toHaveBeenCalledTimes(1)
	expect(mocks.output.info).toHaveBeenCalledWith("Preview is running at: http://localhost:1234")
})
