import * as yup from "yup"

export const configSchema = yup
	.object({
		development: yup.object().shape({
			host: yup.string().max(255),
			port: yup.number().positive().max(65535),
			cert: yup.string(),
			key: yup.string(),
		}),
		output: yup.object().shape({
			singleBundle: yup.boolean(),
			filename: yup.string(),
		}),
	})
	.defined()
	.noUnknown()
	.strict(true)

export type ChaynsScriptsConfiguration = yup.InferType<typeof configSchema>
