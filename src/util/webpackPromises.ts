import { RsbuildInstance } from "@rsbuild/core"
import type { Stats } from "@rspack/core"

export async function runCompiler(rsbuild: RsbuildInstance): Promise<Stats> {
	const result = await rsbuild.build()
	return result.stats as Stats
}
