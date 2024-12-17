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

	const $style = document.createElement("style")
	document.head.appendChild($style)
	$style.sheet.insertRule("html.chayns-toolkit-css-loading { overflow: hidden; opacity: 0; }")

	const setVisibility = (v) => {
		if (v) {
			document.documentElement.classList.remove("chayns-toolkit-css-loading")
			$style.remove()
		} else {
			document.documentElement.classList.add("chayns-toolkit-css-loading")
		}
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
