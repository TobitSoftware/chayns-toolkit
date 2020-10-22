import React from "react"

function EnvTest(): JSX.Element {
	return (
		<div>
			<h2>Loading Environment Variables</h2>
			<div>
				The current username is{" "}
				<code
					className="chayns__background-color--101"
					style={{ padding: "2px 6px", borderRadius: 4, fontSize: "0.9em" }}
				>
					{process.env.USERNAME}
				</code>
				.
			</div>
			<div>
				The current NODE_ENV is{" "}
				<code
					className="chayns__background-color--101"
					style={{ padding: "2px 6px", borderRadius: 4, fontSize: "0.9em" }}
				>
					{process.env.NODE_ENV}
				</code>
				.
			</div>
		</div>
	)
}

export default EnvTest
