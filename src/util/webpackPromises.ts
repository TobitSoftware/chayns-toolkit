import { BuildOptions, RsbuildInstance } from "@rsbuild/core"

export async function runCompiler(rsbuild: RsbuildInstance, options?: BuildOptions) {
	const result = await rsbuild.build(options)
	return result.stats
}
