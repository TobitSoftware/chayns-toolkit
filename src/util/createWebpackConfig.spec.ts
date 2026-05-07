import { resolveReactRequiredVersions } from "./createWebpackConfig"

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
