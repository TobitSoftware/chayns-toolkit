import { beforeEach, expect, test, vi } from "vitest"
import { buildCommand } from "./buildCommand"
import type { RsbuildConfig } from "@rsbuild/core"
import type { StepParams } from "../util/runSteps"

const mocks = vi.hoisted(() => ({
	createRsbuild: vi.fn(),
	createWebpackConfig: vi.fn(),
	execFile: vi.fn(),
	modifyWebpackConfig: vi.fn(),
	spawn: vi.fn(),
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

vi.mock("child_process", () => ({
	default: {
		execFile: mocks.execFile,
		spawn: mocks.spawn,
	},
	execFile: mocks.execFile,
	spawn: mocks.spawn,
}))

vi.mock("fs", () => ({
	default: {
		readFileSync: mocks.readFileSync,
	},
}))

const previewMock = vi.fn()
let afterBuildHandler:
	| ((params: { stats?: { hasErrors: () => boolean } }) => Promise<void> | void)
	| undefined
let closeBuildHandler: (() => Promise<void> | void) | undefined

const createChildProcessMock = () => {
	const listeners: Record<string, Array<(...args: unknown[]) => void>> = {}
	const child = {
		exitCode: null as number | null,
		killed: false,
		pid: Math.floor(Math.random() * 100000) + 1,
		kill: vi.fn(() => {
			child.killed = true
			child.exitCode = 0
			listeners.exit?.forEach((listener) => {
				listener(0, null)
			})
			return true
		}),
		once: vi.fn((event: string, listener: (...args: unknown[]) => void) => {
			listeners[event] ??= []
			listeners[event].push(listener)
			return child
		}),
	}

	return child
}

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
	afterBuildHandler = undefined
	closeBuildHandler = undefined
	mocks.createWebpackConfig.mockResolvedValue({})
	mocks.modifyWebpackConfig.mockImplementation(({ config }: { config: RsbuildConfig }) => config)
	mocks.createRsbuild.mockResolvedValue({
		onAfterBuild: vi.fn((handler) => {
			afterBuildHandler = handler as typeof afterBuildHandler
		}),
		onCloseBuild: vi.fn((handler) => {
			closeBuildHandler = handler as typeof closeBuildHandler
		}),
		preview: previewMock,
	})
	mocks.runCompiler.mockResolvedValue({
		hasErrors: () => false,
	})
	mocks.execFile.mockImplementation((file, args, options, callback) => {
		if (typeof options === "function") {
			options(null, "", "")
			return
		}
		if (typeof callback === "function") {
			callback(null, "", "")
		}
	})
	mocks.spawn.mockImplementation(() => createChildProcessMock())
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
	mocks.runCompiler.mockImplementation(async () => {
		await afterBuildHandler?.({
			stats: {
				hasErrors: () => false,
			},
		})

		return undefined
	})

	await buildCommand({ analyze: false, preview: true, watch: true })(params)

	expect(mocks.readFileSync).toHaveBeenCalledWith("./cert.pem")
	expect(mocks.readFileSync).toHaveBeenCalledWith("./key.pem")
	expect(mocks.createRsbuild).toHaveBeenCalledWith({
		rsbuildConfig: {
			server: {
				cors: {
					credentials: true,
					origin: true,
				},
				host: "localhost",
				headers: {
					"Access-Control-Allow-Headers": "Authorization, Content-Type, X-Requested-With",
					"Access-Control-Allow-Private-Network": "true",
				},
				htmlFallback: false,
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

test("coalesces duplicate exec restarts triggered in quick succession", async () => {
	const firstChild = createChildProcessMock()
	const secondChild = createChildProcessMock()
	mocks.spawn.mockImplementationOnce(() => firstChild).mockImplementationOnce(() => secondChild)
	mocks.runCompiler.mockImplementation(async () => {
		await afterBuildHandler?.({
			stats: {
				hasErrors: () => false,
			},
		})

		const startOne = afterBuildHandler?.({
			stats: {
				hasErrors: () => false,
			},
		})
		const startTwo = afterBuildHandler?.({
			stats: {
				hasErrors: () => false,
			},
		})

		await Promise.all([startOne, startTwo])

		return undefined
	})

	await buildCommand({
		analyze: false,
		exec: "node ./build/node-http-server.js",
		preview: false,
		watch: true,
	})(createStepParams())

	expect(mocks.spawn).toHaveBeenCalledTimes(2)
	expect(mocks.execFile).toHaveBeenCalledWith(
		"taskkill",
		["/pid", String(firstChild.pid), "/t", "/f"],
		{ windowsHide: true },
		expect.any(Function),
	)
	expect(mocks.output.info).toHaveBeenCalledWith(
		"Restarting command: node ./build/node-http-server.js",
	)
})

test("starts exec command after a successful build", async () => {
	mocks.runCompiler.mockImplementation(async () => {
		await afterBuildHandler?.({
			stats: {
				hasErrors: () => false,
			},
		})

		return {
			hasErrors: () => false,
		}
	})

	await buildCommand({
		analyze: false,
		exec: "node ./build/node-http-server.js",
		preview: false,
		watch: false,
	})(createStepParams())

	expect(mocks.spawn).toHaveBeenCalledWith("node ./build/node-http-server.js", {
		env: process.env,
		shell: true,
		stdio: "inherit",
	})
	expect(mocks.output.info).toHaveBeenCalledWith(
		"Starting command: node ./build/node-http-server.js",
	)
})

test("restarts exec command after successful rebuilds and cleans it up on close", async () => {
	const firstChild = createChildProcessMock()
	const secondChild = createChildProcessMock()
	mocks.spawn.mockImplementationOnce(() => firstChild).mockImplementationOnce(() => secondChild)
	mocks.runCompiler.mockImplementation(async () => {
		await afterBuildHandler?.({
			stats: {
				hasErrors: () => false,
			},
		})
		await afterBuildHandler?.({
			stats: {
				hasErrors: () => true,
			},
		})
		await afterBuildHandler?.({
			stats: {
				hasErrors: () => false,
			},
		})

		return undefined
	})

	await buildCommand({
		analyze: false,
		exec: "node ./build/node-http-server.js",
		preview: false,
		watch: true,
	})(createStepParams())

	expect(mocks.spawn).toHaveBeenCalledTimes(2)
	expect(mocks.execFile).toHaveBeenNthCalledWith(
		1,
		"taskkill",
		["/pid", String(firstChild.pid), "/t", "/f"],
		{ windowsHide: true },
		expect.any(Function),
	)

	await closeBuildHandler?.()

	expect(mocks.execFile).toHaveBeenNthCalledWith(
		2,
		"taskkill",
		["/pid", String(secondChild.pid), "/t", "/f"],
		{ windowsHide: true },
		expect.any(Function),
	)
})

test("starts preview server directly after a non-watch build", async () => {
	await buildCommand({ analyze: false, preview: true, watch: false })(createStepParams())

	expect(mocks.runCompiler).toHaveBeenCalledWith(expect.anything(), { watch: false })
	expect(previewMock).toHaveBeenCalledTimes(1)
	expect(mocks.output.info).toHaveBeenCalledWith("Preview is running at: http://localhost:1234")
})
