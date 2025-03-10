import { RsbuildInstance } from "@rsbuild/core"

export async function runCompiler(rsbuild: RsbuildInstance) {
	const result = await rsbuild.build()
	return result.stats
}
