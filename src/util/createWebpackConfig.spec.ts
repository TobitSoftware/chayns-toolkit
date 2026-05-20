import { createWebpackConfig, resolveReactRequiredVersions } from "./createWebpackConfig"

test("prefers peer dependency versions by default", () => {
	expect(
		resolveReactRequiredVersions({
			dependencies: {
				react: "^18.3.0",
				"react-dom": "^18.3.0",
			},
			peerDependencies: {
				react: "17 || 18 || 19",
				"react-dom": "17 || 18 || 19",
			},
		}),
	).toStrictEqual({
		react: "17 || 18 || 19",
		reactDom: "17 || 18 || 19",
	})
})

test("uses a string override for react and react-dom", () => {
	expect(
		resolveReactRequiredVersions(
			{
				peerDependencies: {
					react: "17 || 18 || 19",
					"react-dom": "17 || 18 || 19",
				},
			},
			"^19.0.0",
		),
	).toStrictEqual({
		react: "^19.0.0",
		reactDom: "^19.0.0",
	})
})

test("uses react override as fallback for react-dom when only react is provided", () => {
	expect(
		resolveReactRequiredVersions(
			{
				peerDependencies: {
					react: "17 || 18 || 19",
					"react-dom": "17 || 18 || 19",
				},
			},
			{ react: "^18.0.0" },
		),
	).toStrictEqual({
		react: "^18.0.0",
		reactDom: "^18.0.0",
	})
})

test("allows overriding react-dom independently", () => {
	expect(
		resolveReactRequiredVersions(
			{
				peerDependencies: {
					react: "17 || 18 || 19",
					"react-dom": "17 || 18 || 19",
				},
			},
			{ reactDom: "^19.0.0" },
		),
	).toStrictEqual({
		react: "17 || 18 || 19",
		reactDom: "^19.0.0",
	})
})

test("splits entry points across web, node and worker environments", async () => {
	const config = await createWebpackConfig({
		mode: "production",
		analyze: false,
		singleBundle: false,
		serverSideRendering: true,
		packageJson: {
			name: "test-package",
			peerDependencies: {
				react: "^19.0.0",
				"react-dom": "^19.0.0",
			},
		},
		entryPoints: {
			index: {
				pathIndex: "./src/index",
				pathHtml: "./src/index.html",
			},
			client: {
				pathIndex: "./src/index.client",
				target: "web",
			},
			server: {
				pathIndex: "./src/server",
				target: "node",
			},
			worker: {
				pathIndex: "./src/worker",
				target: "web-worker",
			},
		},
	})

	expect(Object.keys(config.environments ?? {})).toStrictEqual(["node", "web", "web-worker"])
	expect(config.environments?.web?.source?.entry).toStrictEqual({
		index: "./src/index",
		client: { import: "./src/index.client", html: false },
	})
	expect(config.environments?.node?.source?.entry).toStrictEqual({
		index: { import: "./src/index", filename: "server/[name].js" },
		server: { import: "./src/server", html: false, filename: "server/[name].js" },
	})
	expect(config.environments?.["web-worker"]?.source?.entry).toStrictEqual({
		worker: { import: "./src/worker", html: false, filename: "client/[name].js" },
	})
	expect(config.environments?.web?.output).toMatchObject({
		target: "web",
		distPath: {
			js: "client/static/js",
			jsAsync: "client/static/js/async",
			css: "client/static/css",
			cssAsync: "client/static/css/async",
			svg: "client/static/svg",
			font: "client/static/font",
			html: "client/",
			wasm: "client/static/wasm",
			image: "client/static/image",
			media: "client/static/media",
			assets: "client/static/assets",
			favicon: "client/",
		},
	})
	expect(config.environments?.node?.output).toMatchObject({
		target: "node",
		distPath: {
			js: "server/static/js",
			jsAsync: "server/static/js/async",
			css: "server/static/css",
			cssAsync: "server/static/css/async",
			svg: "server/static/svg",
			font: "server/static/font",
			html: "server/",
			wasm: "server/static/wasm",
			image: "server/static/image",
			media: "server/static/media",
			assets: "server/static/assets",
			favicon: "server/",
		},
	})
})

test("does not configure module federation for web-worker environments", async () => {
	const config = await createWebpackConfig({
		mode: "production",
		analyze: false,
		singleBundle: false,
		serverSideRendering: true,
		packageJson: {
			name: "test-package",
			peerDependencies: {
				react: "^19.0.0",
				"react-dom": "^19.0.0",
			},
		},
		exposeModules: {
			"./App": "./src/App",
		},
		entryPoints: {
			worker: {
				pathIndex: "./src/worker",
				target: "web-worker",
			},
		},
	})

	expect(config.environments?.["web-worker"]?.source?.entry).toStrictEqual({
		worker: { import: "./src/worker", html: false, filename: "client/[name].js" },
	})
	expect(config.environments?.["web-worker"]?.tools).toBeUndefined()
	expect(config.environments?.web?.source?.entry).toStrictEqual({
		index: { import: undefined, html: false },
	})
	expect(config.environments?.node?.source?.entry).toStrictEqual({
		index: { import: undefined, html: false },
	})
})

test("writes host manifest into client/static and strips the client prefix from manifest paths", async () => {
	const config = await createWebpackConfig({
		mode: "production",
		analyze: false,
		singleBundle: false,
		serverSideRendering: true,
		packageJson: {
			name: "test-package",
			peerDependencies: {
				react: "^19.0.0",
				"react-dom": "^19.0.0",
			},
		},
		manifest: {
			host: true,
		},
		entryPoints: {
			index: {
				pathIndex: "./src/index",
				pathHtml: "./src/index.html",
			},
		},
	})

	const manifestConfig = config.environments?.web?.output?.manifest
	expect(manifestConfig).toMatchObject({
		filename: "client/static/manifest.json",
	})

	if (!manifestConfig || typeof manifestConfig !== "object" || !manifestConfig.generate) {
		throw new Error("Expected a generated manifest configuration for the web environment")
	}

	const generatedManifest = manifestConfig.generate({
		files: [],
		manifestData: {
			allFiles: ["client/static/js/index.im.js", "client/static/image/logo.png", "skip.map"],
			entries: {
				index: {
					initial: {
						js: ["client/static/js/index.im.js"],
						css: ["client/static/css/index.im.css"],
					},
					async: {
						js: ["client/static/js/async/chunk.js"],
						css: ["client/static/css/async/chunk.css"],
					},
					html: ["client/index.html"],
					assets: ["client/static/image/logo.png", "skip.map"],
				},
			},
			integrity: {
				"client/static/js/index.im.js": "sha256-test",
			},
		},
	}) as {
		allFiles: string[]
		entries: {
			index: {
				initial?: { js?: string[]; css?: string[] }
				async?: { js?: string[]; css?: string[] }
				html?: string[]
				assets?: string[]
			}
		}
		integrity: Record<string, string>
		buildVersion: string
	}

	expect(generatedManifest.allFiles).toStrictEqual([
		"static/js/index.im.js",
		"static/image/logo.png",
	])
	expect(generatedManifest.entries.index).toStrictEqual({
		initial: {
			js: ["static/js/index.im.js"],
			css: ["static/css/index.im.css"],
		},
		async: {
			js: ["static/js/async/chunk.js"],
			css: ["static/css/async/chunk.css"],
		},
		html: ["index.html"],
		assets: ["static/image/logo.png"],
	})
	expect(generatedManifest.integrity).toStrictEqual({
		"static/js/index.im.js": "sha256-test",
	})
	expect(generatedManifest.buildVersion).toContain("production-fallback-")
})

test("allows overriding the filename per entry point", async () => {
	const config = await createWebpackConfig({
		mode: "production",
		analyze: false,
		singleBundle: false,
		serverSideRendering: true,
		packageJson: {
			name: "test-package",
			peerDependencies: {
				react: "^19.0.0",
				"react-dom": "^19.0.0",
			},
		},
		entryPoints: {
			client: {
				pathIndex: "./src/index.client",
				target: "web",
				filename: "static/js/index.client.js",
			},
			server: {
				pathIndex: "./src/server",
				target: "node",
				filename: "server-entry.js",
			},
		},
	})

	expect(config.environments?.web?.source?.entry).toStrictEqual({
		client: {
			import: "./src/index.client",
			html: false,
			filename: "client/static/js/index.client.js",
		},
	})
	expect(config.environments?.node?.source?.entry).toStrictEqual({
		server: {
			import: "./src/server",
			html: false,
			filename: "server/server-entry.js",
		},
	})
})
