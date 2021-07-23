import { isPackageInstalled } from "./isPackageInstalled"

test("should match a string package name", () => {
	expect(
		isPackageInstalled(
			{ dependencies: { "@babel/cli": "2.0.0" } },
			"@babel/cli"
		)
	).toBe(true)
})

test("should not match a different package name", () => {
	expect(
		isPackageInstalled(
			{ dependencies: { "@babel/preset-env": "2.0.0" } },
			"@babel/cli"
		)
	).toBe(false)
})

test("should return a list of matches", () => {
	expect(
		isPackageInstalled(
			{
				dependencies: {
					"@babel/preset-env": "2.0.0",
					"@babel/preset-typescript": "2.0.0",
				},
			},
			[/@babel\//]
		)
	).toStrictEqual(["@babel/preset-env", "@babel/preset-typescript"])
})
