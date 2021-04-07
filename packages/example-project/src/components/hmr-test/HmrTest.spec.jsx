import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import HmrTest from "./HmrTest"

global.window.chayns = {
	env: {
		language: "de",
		site: {
			color: "#000000",
		},
		parameters: {},
	},
}

test("should increase count after clicking", () => {
	const { getByText } = render(<HmrTest />)

	const node = getByText("I've been clicked 0 times.")

	userEvent.click(node)

	expect(getByText("I've been clicked 1 times.")).toBeInTheDocument()
})
