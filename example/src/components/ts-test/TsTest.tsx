import React from "react"

export default function TsTest(): JSX.Element {
	const string = null ?? "TypeScript is working!"

	return (
		<div>
			<h2>TypeScript Files</h2>
			<div>{string}</div>
		</div>
	)
}
