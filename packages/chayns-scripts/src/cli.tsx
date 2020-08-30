#!/usr/bin/env node
import { render } from "ink"
import minimist from "minimist"
import React from "react"
import App from "./App"

const command = process.argv[2]
const args = minimist(process.argv.slice(3))

render(<App command={command} args={args} />)
