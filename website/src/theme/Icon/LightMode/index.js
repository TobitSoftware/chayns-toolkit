import React from "react"

export default function LightModeWrapper(props) {
	return (
		<span {...props} style={{ fontSize: 20, lineHeight: 1 }}>
			💡
		</span>
	)
}
