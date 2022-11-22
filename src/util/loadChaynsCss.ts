/* eslint-disable */
// @ts-nocheck

// Replaced compatibility script
// Should be removed when styles are in chayns-components and/or in static style css
export const loadCss = () => {
	// url encoded to prevent append url parameters from cloud worker
	const apiUrl = new URL("https://$.chayns.net/css/".replace("$", "api"))
	const parameters = new URLSearchParams(window.location.search.toLowerCase())

	apiUrl.searchParams.set("siteId", parameters.get("siteid") || "")
	if (parameters.has("colormode")) {
		apiUrl.searchParams.set("colormode", parameters.get("colormode") || "")
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
