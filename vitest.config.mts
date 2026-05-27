import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
	test: {
		exclude: [...configDefaults.exclude, "example/**"],
		globals: true,
		environment: "jsdom",
		setupFiles: "./tests/setup.ts",
	},
})
