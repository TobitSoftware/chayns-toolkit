import * as fs from "fs"
import * as path from "path"
import { promisify } from "util"

const readFileAsync = promisify(fs.readFile)
const writeFileAsync = promisify(fs.writeFile)
const unlinkAsync = promisify(fs.unlink)

export const project = {
	resolvePath(relativePath: string): string {
		return path.resolve(process.cwd(), relativePath)
	},

	hasFile(relativePath: string): boolean {
		return fs.existsSync(this.resolvePath(relativePath))
	},

	async readFile(relativePath: string): Promise<string | null> {
		const absolutePath = this.resolvePath(relativePath)

		try {
			const content = await readFileAsync(absolutePath, {
				encoding: "utf-8",
			})

			return content
		} catch (error: unknown) {
			const fileError = error as { code: string }

			if (fileError.code === "ENOENT") {
				return null
			}
			throw error
		}
	},

	async writeFile(relativePath: string, contents: string): Promise<void> {
		const absolutePath = this.resolvePath(relativePath)

		await writeFileAsync(absolutePath, contents, { encoding: "utf-8" })
	},

	async deleteFile(relativePath: string): Promise<void> {
		const absolutePath = this.resolvePath(relativePath)

		await unlinkAsync(absolutePath)
	},
}
