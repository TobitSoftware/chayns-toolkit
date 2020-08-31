interface Asset {
	chunks: (string | number)[]
	chunkNames: string[]
	emitted: boolean
	isOverSizeLimit?: boolean | undefined
	name: string
	size: number
}
