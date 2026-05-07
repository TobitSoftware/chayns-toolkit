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
