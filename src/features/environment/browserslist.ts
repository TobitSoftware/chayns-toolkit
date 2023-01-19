export const devBrowsers = [
	"last 3 chrome version",
	"last 3 firefox version",
	"last 3 safari version",
].join()

export const prodBrowsers = [
	"cover 90%",
	"not dead",
	"not op_mini all",
	"Firefox ESR",
	"not android < 5",
].join()

export function setBrowserslistEnvironment(mode: "development" | "production" | "none"): void {
	if (mode === "development") {
		process.env.BROWSERSLIST = devBrowsers
	} else if (mode === "production") {
		process.env.BROWSERSLIST = prodBrowsers
	}
}
