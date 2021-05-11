export class Test {
	// @ts-expect-error
	#string = "This is a test."

	getTest() {
		return this.#string
	}
}
