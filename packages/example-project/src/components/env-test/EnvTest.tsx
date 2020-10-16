import React from "react"

function EnvTest(): JSX.Element {
	return <div>{process.env.USERNAME}</div>
}

export default EnvTest
