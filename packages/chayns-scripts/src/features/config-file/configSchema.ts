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
	})
	.required()
	.noUnknown()

export const configSchema = yup
	.object({
		development: developmentSchema,
		output: outputSchema,
	})
	.required()
	.noUnknown()

export type ChaynsScriptsConfiguration = yup.InferType<typeof configSchema>
