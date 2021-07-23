import mock from "mock-fs"
import * as path from "path"
import { loadPackageJson } from "./loadPackageJson"

test("should load package.json file", () => {
	mock({
		[path.resolve("package.json")]: `
            {
                "name": "my-package",
                "version": "1.0.0",
                "dependencies": {
                    "@babel/core": "2.0.0"
                }
            }
        `,
	})

	return loadPackageJson().then((result) => {
		expect(result).toEqual({
			name: "my-package",
			version: "1.0.0",
			dependencies: {
				"@babel/core": "2.0.0",
			},
		})
	})
})
