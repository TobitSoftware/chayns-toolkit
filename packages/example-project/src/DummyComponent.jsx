import { Button } from "chayns-components"
import React, { useState } from "react"
import "./dummy-css.scss"

const DummyComponent = () => {
	const [state, setState] = useState(0)

	return (
		<Button onClick={() => setState((s) => s + 1)}>Hello World! {state}</Button>
	)
}

export default DummyComponent
