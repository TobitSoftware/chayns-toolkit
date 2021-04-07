export default {
	repository: "https://github.com/TobitSoftware/chayns-toolkit", // project repo
	docsRepository: "https://github.com/TobitSoftware/chayns-toolkit", // docs repo
	branch: "master", // branch of docs
	path: "/", // path of docs
	titleSuffix: " – chayns Toolkit",
	nextLinks: true,
	prevLinks: true,
	search: true,
	customSearch: null, // customizable, you can use algolia for example
	darkMode: true,
	footer: true,
	footerText: "MIT 2021 © Tobit Software Laboratories AG",
	footerEditOnGitHubLink: true, // will link to the docs repo
	logo: (
		<>
			<img src="logo.png" style={{ height: 32 }} alt="chayns-toolkit" />
		</>
	),
	head: (
		<>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1.0"
			/>
			<meta name="description" content="Nextra: the next docs builder" />
			<meta name="og:title" content="Nextra: the next docs builder" />
		</>
	),
}
