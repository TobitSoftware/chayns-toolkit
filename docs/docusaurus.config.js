/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
	title: "chayns-toolkit",
	tagline: "A zero-config toolchain for developing chayns® apps.",
	url: "https://tobitsoftware.github.io/chayns-toolkit",
	baseUrl: "/chayns-toolkit/",
	onBrokenLinks: "warn",
	onBrokenMarkdownLinks: "warn",
	favicon: "/img/favicon.ico",
	organizationName: "TobitSoftware", // Usually your GitHub org/user name.
	projectName: "chayns-toolkit", // Usually your repo name.
	themeConfig: {
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
			style: "light",

			copyright: `Copyright © ${new Date().getFullYear()} Tobit Software Laboratories AG. Built with Docusaurus.`,
		},
	},
	presets: [
		[
			"@docusaurus/preset-classic",
			{
				docs: {
					sidebarPath: require.resolve("./sidebars.js"),
					// Please change this to your repo.
					editUrl:
						"https://github.com/TobitSoftware/chayns-toolkit/edit/main/docs/",
				},
				theme: {
					customCss: require.resolve("./src/css/custom.css"),
				},
			},
		],
	],
}
