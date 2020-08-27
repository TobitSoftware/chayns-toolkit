#!/usr/bin/env node
import { render } from "ink"
import React from "react"
import App from "./App"

const command = process.argv[2]

render(<App command={command} />)
