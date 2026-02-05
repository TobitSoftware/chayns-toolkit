import { z } from "zod"
import type { RsbuildConfig } from "@rsbuild/core/dist-types/types/config"
import type { JestConfig } from "../../commands/testCommand"

const developmentSchema = z.object({
	host: z.string().max(255).default("adaptive"),
	port: z.coerce.number().positive().max(65535).default(1234),
	ports: z
		.object({
			client: z.coerce.number().positive().max(65535).default(1234),
			server: z.coerce.number().positive().max(65535).default(1235),
		})
		.default({}),
	strictPort: z.boolean().default(false),
	cert: z.string().optional(),
	key: z.string().optional(),
})

const outputSchema = z
	.object({
		singleBundle: z.boolean().default(false),
		filename: z
			.object({
				html: z.string().optional(),
				js: z.string().optional(),
				css: z.string().optional(),
				svg: z.string().optional(),
				font: z.string().optional(),
				image: z.string().optional(),
				media: z.string().optional(),
			})
			.optional(),
		path: z.string().default("build"),
		serverSideRendering: z
			.union([z.literal("all"), z.literal("build-only"), z.boolean()])
			.default(false),
		prefixCss: z.boolean().default(false),
		cssVersion: z
			.string()
			.regex(/^\d+\.\d+$/)
			.default("4.2"),
		exposeModules: z.record(z.string(), z.string()).optional(),
		disableReactSharing: z.boolean().default(false),
		reactRuntime: z.union([z.literal("automatic"), z.literal("classic")]).default("classic"),
		entryPoints: z
			.record(
				z.string(),
				z.object({
					pathIndex: z.string(),
					pathHtml: z.string().optional(),
					templateParameters: z.record(z.string(), z.string()).optional(),
				}),
			)
			.default({}),
	})
	.refine(
		(data) =>
			Object.keys(data.entryPoints).length || Object.keys(data.exposeModules ?? {}).length,
		"Need to define at least one key for either output.entryPoints or output.exposeModules",
	)

const manifestSchema = z.object({
	host: z.boolean().default(false),
	module: z.boolean().default(false),
	externalAssets: z.array(z.string()).optional(),
	textStringLibraries: z.array(z.string()).optional(),
})

export const configSchema = z.object({
	development: developmentSchema.default({}),
	output: outputSchema.default({
		entryPoints: {
			index: {
				pathIndex: "./src/index",
				pathHtml: "./src/index.html",
			},
		},
	}),
	manifest: manifestSchema.default({}),
	webpack: z
		.function()
		.args(
			z.custom<RsbuildConfig>(),
			z.object({
				dev: z.boolean(),
				target: z.union([z.literal("server"), z.literal("client"), z.null()]),
				watch: z.boolean().default(false),
			}),
		)
		.returns(z.custom<RsbuildConfig>())
		.optional(),
	jest: z.function().args(z.custom<JestConfig>()).returns(z.custom<JestConfig>()).optional(),
})

export type ToolkitConfig = z.input<typeof configSchema>
export type ParsedToolkitConfig = z.output<typeof configSchema>
