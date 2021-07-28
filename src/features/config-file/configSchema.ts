import * as yup from "yup"

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
		filename: yup.string().default("[package].[contenthash].js").required(),
		path: yup.string().notRequired(),
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
	})
	.required()
	.noUnknown()

export type ToolkitConfig = yup.InferType<typeof configSchema>
