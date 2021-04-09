import Link from "@docusaurus/Link"
import useBaseUrl from "@docusaurus/useBaseUrl"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import Layout from "@theme/Layout"
import clsx from "clsx"
import React from "react"
import styles from "./styles.module.css"

const features = [
	{
		title: "Zero Config",
		imageUrl: "../img/undraw_To_the_stars_qhyy.svg",
		description: (
			<>
				Automatic compilation and bundling. Optimized for production
				from the start.
			</>
		),
	},
	{
		title: "TypeScript support",
		imageUrl: "../img/undraw_Security_on_ff2u.svg",
		description: <>Automatic TypeScript configuration and compilation.</>,
	},
	{
		title: "Fast Refresh",
		imageUrl: "../img/undraw_fast_loading_0lbh.svg",
		description: (
			<>
				Fast, reliable live-editing experience, as proven at Facebook
				scale.
			</>
		),
	},
]

function Feature({ imageUrl, title, description }) {
	const imgUrl = useBaseUrl(imageUrl)
	return (
		<div className={clsx("col col--4", styles.feature)}>
			{imgUrl && (
				<div className="text--center">
					<img
						className={styles.featureImage}
						src={imgUrl}
						alt={title}
					/>
				</div>
			)}
			<h3>{title}</h3>
			<p>{description}</p>
		</div>
	)
}

export default function Home() {
	const context = useDocusaurusContext()
	const { siteConfig = {} } = context
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<header className={clsx("hero hero--primary", styles.heroBanner)}>
				<div className="container">
					<h1 className="hero__title">{siteConfig.title}</h1>
					<p className="hero__subtitle">{siteConfig.tagline}</p>
					<div className={styles.buttons}>
						<Link
							className={clsx(
								"button button--outline button--secondary button--lg",
								styles.getStarted
							)}
							to={useBaseUrl("docs/")}
						>
							Get Started
						</Link>
					</div>
				</div>
			</header>
			<main>
				{features && features.length > 0 && (
					<section className={styles.features}>
						<div className="container">
							<div className="row">
								{features.map((props, idx) => (
									<Feature key={idx} {...props} />
								))}
							</div>
						</div>
					</section>
				)}
			</main>
		</Layout>
	)
}
