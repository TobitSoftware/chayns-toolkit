#!/usr/bin/env node
import { render } from "ink"
import minimist from "minimist"
import React from "react"
import App from "./App"
import { checkForTsconfig } from "./util/checkForTsconfig"

const command = process.argv[2]
const args = minimist(process.argv.slice(3))

async function start() {
	await checkForTsconfig()

	render(<App command={command} args={args} />)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start()
