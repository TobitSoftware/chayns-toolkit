import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"

global.window.chayns = {
	env: {
		language: "de",
		site: {
			color: "#000000",
		},
	},
}

const HmrTest = require("./HmrTest").default

const test = true

// checking if counter is working
it("HmrTest - click", () => {
	render(<HmrTest />)

	screen.debug()

	const node = screen.getByText("I've been clicked 0 times.")
	fireEvent.click(node)
	screen.getByText("I've been clicked 1 times.")

	expect(test).toBe(true)
})
