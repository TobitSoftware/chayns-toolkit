import { ToolkitConfig as InternalToolkitConfig } from "./features/config-file/configSchema"
import type { WebpackModifierFunction } from "./util/modifyWebpackConfig"
import type { JestConfig } from "./commands/testCommand"
import type { EntryPoints } from "./util/createWebpackConfig"

export type ToolkitConfig = {
	development?: Partial<InternalToolkitConfig["development"]>
	output?: Omit<Partial<InternalToolkitConfig["output"]>, "entryPoints"> & {
		entryPoints: EntryPoints
	}
	webpack?: WebpackModifierFunction
	jest?: (config: JestConfig) => JestConfig
}
