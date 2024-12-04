import * as yup from "yup"
import { EntryPoint } from "../../util/createWebpackConfig"

const developmentSchema = yup
	.object({
		host: yup.string().max(255).default("adaptive").required(),
		port: yup.number().positive().max(65535).default(1234).required(),
		cert: yup.string().notRequired(),
		key: yup.string().notRequired(),
	})
	.required()
	.noUnknown()

const outputSchema = yup
	.object({
		singleBundle: yup.boolean().default(false).required(),
		filename: yup
			.object({
				html: yup.string().notRequired(),
				js: yup.string().notRequired(),
				css: yup.string().notRequired(),
				svg: yup.string().notRequired(),
				font: yup.string().notRequired(),
				image: yup.string().notRequired(),
				media: yup.string().notRequired(),
			})
			.notRequired(),
		path: yup.string().notRequired().default("build"),
		serverSideRendering: yup
			.mixed()
			.oneOf([true, false, "all", "build-only"])
			.default(false)
			.required(),
		prefixCss: yup.boolean().notRequired(),
		cssVersion: yup
			.string()
			.matches(/^\d+.\d+$/)
			.notRequired(),
		exposeModules: yup.object().notRequired(),
		entryPoints: yup
			.object()
			.required()
			.default({} as EntryPoint),
	})
	.required()
	.noUnknown()

export const configSchema = yup
	.object({
		development: developmentSchema,
		output: outputSchema,
		webpack: yup
			.mixed()
			.notRequired()
			.default(null)
			.test(
				"is-function-or-null",
				// eslint-disable-next-line no-template-curly-in-string
				"${path} is not a function or null",
				(value) => typeof value === "function" || value === null
			),
		jest: yup
			.mixed()
			.notRequired()
			.default(null)
			.test(
				"is-function-or-null",
				// eslint-disable-next-line no-template-curly-in-string
				"${path} is not a function or null",
				(value) => typeof value === "function" || value === null
			),
		webpackDev: yup.mixed().notRequired().default(null),
	})
	.required()
	.noUnknown()

export type ToolkitConfig = yup.InferType<typeof configSchema>
