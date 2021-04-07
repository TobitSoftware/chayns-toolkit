import React from "react"
import smallImageSrc from "./small-image.jpg"

export default function UrlLoaderTest() {
	return (
		<div>
			<h2>URL Loader</h2>
			<img src={smallImageSrc} alt="" style={{ maxWidth: "100%" }} />
		</div>
	)
}
