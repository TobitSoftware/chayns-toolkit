/* eslint-disable react/prop-types */
import "nextra-theme-docs/style.css"

export default function Nextra({ Component, pageProps }) {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <Component {...pageProps} />
}
