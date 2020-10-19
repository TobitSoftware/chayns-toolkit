import mock from "mock-fs"
import * as path from "path"
import { getPackageManager } from "./getPackageManager"

afterEach(() => {
	mock.restore()
})

test("should identify yarn", () => {
	mock({
		[path.resolve("yarn.lock")]: "",
	})

	expect(getPackageManager()).toBe("yarn")
})

test("should identify npm", () => {
	mock({
		[path.resolve("package-lock.json")]: "",
	})

	expect(getPackageManager()).toBe("npm")
})

test("should identify yarn in a monorepo", () => {
	mock({
		[path.resolve("../../yarn.lock")]: "",
	})

	expect(getPackageManager()).toBe("yarn")
})
