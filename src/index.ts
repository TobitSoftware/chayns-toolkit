import { ToolkitConfig } from "./features/config-file/configSchema"

export { loadEnv } from "@rsbuild/core"

export { ToolkitConfig }
export const buildToolkitConfig = (config: ToolkitConfig): ToolkitConfig => config
