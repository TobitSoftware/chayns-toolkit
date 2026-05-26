import { beforeEach, expect, test, vi } from "vitest"
import type { RsbuildConfig } from "@rsbuild/core"
import type { StepParams } from "../util/runSteps"
import { devCommand } from "./devCommand"

const mocks = vi.hoisted(() => ({
	createRsbuild: vi.fn(),
	createWebpackConfig: vi.fn(),
	execFile: vi.fn(),
	modifyWebpackConfig: vi.fn(),
	output: {
		info: vi.fn(),
		error: vi.fn(),
		blank: vi.fn(),
	},
	spawn: vi.fn(),
	exec: vi.fn(),
	readFileSync: vi.fn(),
	watchFile: vi.fn(),
	unwatchFile: vi.fn(),
	resolvePath: vi.fn((file: string) => file),
	hasFile: vi.fn(() => false),
	resetEnvironment: vi.fn(),
	loadEnvironment: vi.fn(),
	runSteps: vi.fn(),
}))

vi.mock("@rsbuild/core", () => ({
	createRsbuild: mocks.createRsbuild,
}))

vi.mock("child_process", () => ({
	default: {
		exec: mocks.exec,
		execFile: mocks.execFile,
		spawn: mocks.spawn,
	},
	exec: mocks.exec,
	execFile: mocks.execFile,
	spawn: mocks.spawn,
}))

vi.mock("fs", async (importOriginal) => {
	const actual = await importOriginal<typeof import("fs")>()

	return {
		...actual,
		default: {
			...actual,
			readFileSync: mocks.readFileSync,
			watchFile: mocks.watchFile,
		},
		readFileSync: mocks.readFileSync,
		watchFile: mocks.watchFile,
	}
})

vi.mock("node:fs", () => ({
	default: {
		unwatchFile: mocks.unwatchFile,
	},
	unwatchFile: mocks.unwatchFile,
}))

vi.mock("../util/createWebpackConfig", () => ({
	createWebpackConfig: mocks.createWebpackConfig,
}))

vi.mock("../util/modifyWebpackConfig", () => ({
	modifyWebpackConfig: mocks.modifyWebpackConfig,
}))

vi.mock("../util/output", () => ({
	output: mocks.output,
}))

vi.mock("../util/project", () => ({
	project: {
		resolvePath: mocks.resolvePath,
		hasFile: mocks.hasFile,
	},
}))

vi.mock("../features/environment/loadEnvironment", () => ({
	resetEnvironment: mocks.resetEnvironment,
	loadEnvironment: mocks.loadEnvironment,
}))

vi.mock("../util/runSteps", () => ({
	runSteps: mocks.runSteps,
}))

vi.mock("../features/config-file/loadConfig", () => ({
	usedConfigFilename: undefined,
}))

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

let afterDevCompileHandler:
	| ((params: { stats: { hasErrors: () => boolean } }) => Promise<void> | void)
	| undefined
let closeDevServerHandler: (() => Promise<void> | void) | undefined

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
		dependencies: {},
		devDependencies: {},
	},
	packageManager: "npm",
})

beforeEach(() => {
	vi.clearAllMocks()
	afterDevCompileHandler = undefined
	closeDevServerHandler = undefined
	mocks.createWebpackConfig.mockResolvedValue({})
	mocks.modifyWebpackConfig.mockImplementation(({ config }: { config: RsbuildConfig }) => config)
	mocks.createRsbuild.mockResolvedValue({
		onAfterDevCompile: vi.fn((handler) => {
			afterDevCompileHandler = handler as typeof afterDevCompileHandler
		}),
		onCloseDevServer: vi.fn((handler) => {
			closeDevServerHandler = handler as typeof closeDevServerHandler
		}),
		startDevServer: vi.fn().mockResolvedValue({
			server: {
				close: vi.fn().mockResolvedValue(undefined),
			},
			urls: ["http://localhost:1234"],
		}),
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
	mocks.readFileSync.mockReturnValue(Buffer.from("cert"))
})

test("starts exec command after a successful dev compile", async () => {
	await devCommand({ exec: "node ./build/node-http-server.js" })(createStepParams())

	await afterDevCompileHandler?.({
		stats: {
			hasErrors: () => false,
		},
	})

	expect(mocks.spawn).toHaveBeenCalledWith("node ./build/node-http-server.js", {
		env: process.env,
		shell: true,
		stdio: "inherit",
	})
	expect(mocks.output.info).toHaveBeenCalledWith(
		"Starting command: node ./build/node-http-server.js",
	)
})

test("does not start exec command after a failed dev compile", async () => {
	await devCommand({ exec: "node ./build/node-http-server.js" })(createStepParams())

	await afterDevCompileHandler?.({
		stats: {
			hasErrors: () => true,
		},
	})

	expect(mocks.spawn).not.toHaveBeenCalled()
})

test("restarts exec command on successful recompiles and cleans up on close", async () => {
	const firstChild = createChildProcessMock()
	const secondChild = createChildProcessMock()
	mocks.spawn.mockImplementationOnce(() => firstChild).mockImplementationOnce(() => secondChild)

	await devCommand({ exec: "node ./build/node-http-server.js" })(createStepParams())

	await afterDevCompileHandler?.({
		stats: {
			hasErrors: () => false,
		},
	})
	await afterDevCompileHandler?.({
		stats: {
			hasErrors: () => true,
		},
	})
	await afterDevCompileHandler?.({
		stats: {
			hasErrors: () => false,
		},
	})

	expect(mocks.spawn).toHaveBeenCalledTimes(2)
	expect(mocks.execFile).toHaveBeenNthCalledWith(
		1,
		"taskkill",
		["/pid", String(firstChild.pid), "/t", "/f"],
		{ windowsHide: true },
		expect.any(Function),
	)

	await closeDevServerHandler?.()

	expect(mocks.execFile).toHaveBeenNthCalledWith(
		2,
		"taskkill",
		["/pid", String(secondChild.pid), "/t", "/f"],
		{ windowsHide: true },
		expect.any(Function),
	)
})
