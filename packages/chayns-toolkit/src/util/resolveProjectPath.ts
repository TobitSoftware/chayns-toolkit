import * as path from "path"

export function resolveProjectPath(relativePath: string) {
	return path.resolve(process.cwd(), relativePath)
}
