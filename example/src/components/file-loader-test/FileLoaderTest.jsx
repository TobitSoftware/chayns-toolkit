import React from "react"
import imageSrc from "./image.jpg"

export default function FileLoaderTest() {
	return (
		<div>
			<h2>File Loader</h2>
			<img src={imageSrc} alt="" style={{ maxWidth: "100%" }} />
		</div>
	)
}
