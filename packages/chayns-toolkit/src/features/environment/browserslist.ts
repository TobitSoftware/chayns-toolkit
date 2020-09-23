export const devBrowsers = [
	"last 1 chrome version",
	"last 1 firefox version",
	"last 1 safari version",
].join()

export const prodBrowsers = [">0.5%", "not dead", "not op_mini all"].join()

export function setBrowsersListEnv(mode: "development" | "production"): void {
	if (mode === "development") {
		process.env.BROWSERSLIST = devBrowsers
	} else if (mode === "production") {
		process.env.BROWSERSLIST = prodBrowsers
	}
}
