import type { Compiler, Stats } from "webpack"

export function runCompiler(compiler: Compiler): Promise<Stats> {
	return new Promise((resolve, reject) => {
		compiler.run((error, stats) => {
			if (error) {
				reject(error)
			} else {
				resolve(stats)
			}
		})
	})
}

export function closeCompiler(compiler: Compiler): Promise<void> {
	return new Promise((resolve, reject) => {
		compiler.close((error) => {
			if (error) {
				reject(error)
			} else {
				resolve()
			}
		})
	})
}
