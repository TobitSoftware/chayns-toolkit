import { configSchema } from "./configSchema"

test("accepts a string reactRequiredVersions override", () => {
	const config = configSchema.parse({
		output: {
			reactRequiredVersions: "^19.0.0",
			entryPoints: {
				index: {
					pathIndex: "./src/index",
				},
			},
		},
	})

	expect(config.output.reactRequiredVersions).toBe("^19.0.0")
})

test("accepts a reactRequiredVersions object override", () => {
	const config = configSchema.parse({
		output: {
			reactRequiredVersions: {
				react: "^18.0.0",
				reactDom: "^19.0.0",
			},
			entryPoints: {
				index: {
					pathIndex: "./src/index",
				},
			},
		},
	})

	expect(config.output.reactRequiredVersions).toStrictEqual({
		react: "^18.0.0",
		reactDom: "^19.0.0",
	})
})

test("rejects an empty reactRequiredVersions object", () => {
	expect(() =>
		configSchema.parse({
			output: {
				reactRequiredVersions: {},
				entryPoints: {
					index: {
						pathIndex: "./src/index",
					},
				},
			},
		}),
	).toThrow("Need to define at least one key for output.reactRequiredVersions")
})

test("accepts environment targets for entry points", () => {
	const config = configSchema.parse({
		output: {
			entryPoints: {
				index: {
					pathIndex: "./src/index",
					filename: "custom/[name].js",
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
		},
	})

	expect(config.output.entryPoints.server.target).toBe("node")
	expect(config.output.entryPoints.worker.target).toBe("web-worker")
	expect(config.output.entryPoints.index.filename).toBe("custom/[name].js")
})
