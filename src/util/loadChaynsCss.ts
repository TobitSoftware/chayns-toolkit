/* eslint-disable */
// @ts-nocheck

// Replaced compatibility script
// Should be removed when styles are in chayns-components and/or in static style css
export const loadCss = () => {
	const apiUrl = new URL("https://api.chayns.net/css/")
	const parameters = new URLSearchParams(window.location.search.toLowerCase())

	if (!apiUrl.searchParams.has("siteId")) {
		apiUrl.searchParams.set("siteId", parameters.get("siteid") || "")
	}

	document.documentElement.style.visibility = "hidden"
	document.documentElement.style.overflow = "hidden"

	const head = document.getElementsByTagName("HEAD")[0]
	const link = document.createElement("link")

	link.rel = "stylesheet"
	link.type = "text/css"
	link.href = apiUrl.toString()
	link.onload = () => {
		document.documentElement.style.visibility = "visible"
	}
	link.onerror = () => {
		document.documentElement.style.visibility = "visible"
	}

	head.appendChild(link)
	return ""
}
