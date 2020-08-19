#!/usr/bin/env node
import { render } from "ink"
import React from "react"
import Build from "./scripts/Build"
import Dev from "./scripts/Dev"
import Lint from "./scripts/Lint"

const command = process.argv[2]

switch (command) {
	case "lint":
		render(<Lint />)
		break
	case "build":
		render(<Build />)
		break
	case "dev":
		render(<Dev />)
		break
	default:
		console.log(`\n\nThere is no "${command}" command.\n\n`)
}
