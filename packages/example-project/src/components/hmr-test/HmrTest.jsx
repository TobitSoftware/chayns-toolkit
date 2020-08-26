import { Button } from "chayns-components"
import React, { useReducer } from "react"

export default function HmrTest() {
	const [counter, increaseCounter] = useReducer((s) => s + 1, 0)

	return (
		<Button onClick={increaseCounter}>
			I&apos;ve been clicked {counter} times.
		</Button>
	)
}
