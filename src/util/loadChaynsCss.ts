/* eslint-disable */
// @ts-nocheck

export const getCssTag = (version = "4.2") => {
	const url = new URL(`https://style.tobit.cloud/css/v${version}`)
	if (
		["development", "qa", "staging"].includes(process.env.BUILD_ENV) ||
		process.env.NODE_ENV === "development"
	) {
		url.host = "style-staging.tobit.cloud"
	}
	const script = loadCss.toString().replace("##url##", url.toString())
	return `<script>(${script})()</script>`
}

// Replaced compatibility script
// Should be removed when styles are in chayns-components and/or in static style css
const loadCss = () => {
	// url encoded to prevent append url parameters from cloud worker
	const apiUrl = new URL("##url##")
	const parameters = new URLSearchParams(window.location.search.toLowerCase())

	apiUrl.searchParams.set(
		"siteId",
		parameters.get("stylesiteid") || parameters.get("siteid") || ""
	)
	if (parameters.has("colormode")) {
		apiUrl.searchParams.set("colormode", parameters.get("colormode") || "")
	}
	if (parameters.has("color")) {
		apiUrl.searchParams.set("color", parameters.get("color") || "")
	}

	const hidden = "hidden"

	const setVisibility = (v) => {
		document.documentElement.style.visibility = v ? "" : hidden
		document.documentElement.style.overflow = v ? "" : hidden
	}
	setVisibility(false)

	const head = document.getElementsByTagName("HEAD")[0]
	const link = document.createElement("link")

	link.rel = "stylesheet"
	link.type = "text/css"
	link.href = apiUrl.toString()

	link.onload = () => {
		setVisibility(true)
	}
	link.onerror = () => {
		setVisibility(true)
	}

	head.appendChild(link)
	return ""
}
