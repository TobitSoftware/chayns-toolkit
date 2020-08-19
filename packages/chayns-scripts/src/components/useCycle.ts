import { useCallback, useState } from "react"

export function useCycle<T>(...elements: Array<T>): [T, () => void] {
	const [index, setIndex] = useState(0)

	const cycle = useCallback(() => {
		setIndex((index) => (index + 1) % elements.length)
	}, [elements])

	return [elements[index], cycle]
}
