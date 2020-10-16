import commonjs from "@rollup/plugin-commonjs"
import json from "@rollup/plugin-json"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import typescript from "@rollup/plugin-typescript"
import autoExternal from "rollup-plugin-auto-external"
import { terser } from "rollup-plugin-terser"
import pkg from "./package.json"

const isProduction = process.env.NODE_ENV === "production"

export default {
	input: "src/cli.ts",
	output: {
		dir: "lib",
		format: "cjs",
		banner: "#! /usr/bin/env node",
		sourcemap: true,
		exports: "default",
	},
	plugins: [
		resolve({
			extensions: [".js", ".ts"],
		}),
		commonjs({ extensions: [".js", ".ts"] }),
		autoExternal(),
		typescript({
			tsconfig: "./tsconfig.json",
			include: ["src/**/*.ts"],
		}),
		json(),
		isProduction && terser(),
		replace({
			__PKG_VERSION__: pkg.version,
		}),
	].filter(Boolean),
}
