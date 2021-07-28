import { fill } from "lodash-es"

test("should be true", () =>
	expect(fill([1, 2, 3, 4], 5)).toStrictEqual([5, 5, 5, 5]))
