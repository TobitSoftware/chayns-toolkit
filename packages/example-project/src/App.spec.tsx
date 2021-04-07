import * as fs from "fs"

test("should be true", () =>
	expect(typeof fs.readFile === "function").toBe(true))
