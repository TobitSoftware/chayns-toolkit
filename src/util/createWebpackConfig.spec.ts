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
	})
	expect(config.environments?.node?.source?.entry).toStrictEqual({
		index: { import: "./src/index", html: false },
		server: { import: "./src/server", html: false },
	})
	expect(config.environments?.["web-worker"]?.source?.entry).toStrictEqual({
		worker: { import: "./src/worker", html: false },
	})
	expect(config.environments?.web?.output).toMatchObject({
		target: "web",
		distPath: {
			js: "client/static/js",
			jsAsync: "client/static/js",
			json: "client/",
		},
	})
	expect(config.environments?.node?.output).toMatchObject({
		target: "node",
		distPath: {
			js: "server/",
			jsAsync: "server/",
			json: "server/",
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
		worker: { import: "./src/worker", html: false },
	})
	expect(config.environments?.["web-worker"]?.tools).toBeUndefined()
	expect(config.environments?.web?.source?.entry).toStrictEqual({
		index: { import: undefined, html: false },
	})
	expect(config.environments?.node?.source?.entry).toStrictEqual({
		index: { import: undefined, html: false },
	})
})
