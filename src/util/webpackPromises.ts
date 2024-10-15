import { RsbuildInstance } from "@rsbuild/core"
import { Compiler, Stats } from "@rspack/core"

export async function runCompiler(rsbuild: RsbuildInstance): Promise<Stats> {
	const result = await rsbuild.build()
	return result.stats as Stats
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
