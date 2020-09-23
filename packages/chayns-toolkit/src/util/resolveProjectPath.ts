import * as path from "path"

export function resolveProjectPath(relativePath: string): string {
	return path.resolve(process.cwd(), relativePath)
}
