/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: "chayns-toolkit",
	tagline: "A zero-config toolchain for developing chayns® apps.",
	url: "https://tobitsoftware.github.io",
	baseUrl: "/chayns-toolkit/",
	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",
	favicon: "/img/favicon.ico",
	organizationName: "TobitSoftware", // Usually your GitHub org/user name.
	projectName: "chayns-toolkit", // Usually your repo name.
	themeConfig: {
		colorMode: {
			respectPrefersColorScheme: true,
		},
		navbar: {
			logo: {
				alt: "chayns-toolkit Logo",
				src: "img/logo.svg",
			},
			items: [
				{
					to: "docs/",
					activeBasePath: "docs",
					label: "Docs",
					position: "left",
				},
				{
					href: "https://github.com/TobitSoftware/chayns-toolkit",
					label: "GitHub",
					position: "right",
				},
			],
		},
		footer: {
			copyright: `Copyright © ${new Date().getFullYear()} Tobit Software Laboratories AG. Built with Docusaurus.`,
		},
		prism: {
			theme: require("prism-react-renderer").themes.github,
			darkTheme: require("prism-react-renderer").themes.oceanicNext,
		},
		algolia: {
			apiKey: "d32ad728937f5e05637e7bcb70ae6171",
			appId: "BH4D9OD16A",
			indexName: "tobitsoftware",
		},
	},
	presets: [
		[
			"@docusaurus/preset-classic",
			{
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					// Please change this to your repo.
					editUrl: "https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/",
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			},
		],
	],
}
