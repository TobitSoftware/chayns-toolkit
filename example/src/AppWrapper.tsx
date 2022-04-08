import React from "react"
import { InferProps } from "prop-types"
import App from "./App"

const propTypes = {}

const AppWrapper: React.FunctionComponent<InferProps<typeof propTypes>> = (
	props
) => {
	return <App />
}

// export default withCompatMode(AppWrapper);
export default AppWrapper
