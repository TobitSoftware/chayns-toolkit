import React from "react"

const PipelineOperatorTest = () => {
	const num = "123" |> Number

	return (
		<div>
			<h2>Customizing the Webpack Configuration</h2>
			<div>Adding the pipeline operator Babel plugin works: {num}</div>
		</div>
	)
}

export default PipelineOperatorTest
