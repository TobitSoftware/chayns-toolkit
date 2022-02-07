import React from "react"
import { InferProps } from "prop-types"
import { ChaynsProvider } from "chayns-api"
import App from "./App"

const propTypes = {}

const AppWrapper: React.FunctionComponent<InferProps<typeof propTypes>> = (
	props
) => {
	return (
		<ChaynsProvider {...props}>
			<App />
		</ChaynsProvider>
	)
}

// export default withCompatMode(AppWrapper);
export default AppWrapper
