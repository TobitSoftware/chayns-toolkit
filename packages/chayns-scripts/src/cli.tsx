#!/usr/bin/env node
import { Command } from "commander"
import { render } from "ink"
import * as path from "path"
import React from "react"
import Build from "./commands/Build"
import Dev from "./commands/Dev"
import Lint from "./commands/Lint"
import { checkForTsconfig } from "./util/checkForTsconfig"

const program = new Command()
program.version(
	// eslint-disable-next-line
	require(path.join(__dirname, "../package.json")).version,
	"-v, --version",
	"output the version number"
)

program
	.command("dev")
	.description("start up a development server with hot module replacement")
	.action(() => {
		checkForTsconfig()
		render(<Dev />)
	})

program
	.command("build")
	.description("bundles your code for production")
	.option("-a, --analyze", "analyze your bundle size", false)
	.action((options: { analyze: boolean }) => {
		render(<Build analyze={options.analyze} />)
	})

program
	.command("lint")
	.description("lints your code for possible errors")
	.action(() => {
		render(<Lint />)
	})

program.parse(process.argv)
