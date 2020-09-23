import { useEffect, useState } from "react"
import { ChaynsScriptsConfiguration } from "./configSchema"
import { loadConfig } from "./loadConfig"

type UseConfigReturn = [
	ChaynsScriptsConfiguration | undefined,
	Error | undefined
]

export function useConfig(): UseConfigReturn {
	const [config, setConfig] = useState<ChaynsScriptsConfiguration>()
	const [error, setError] = useState<Error>()

	useEffect(function readConfig() {
		loadConfig().then(setConfig).catch(setError)
	}, [])

	return [config, error]
}
