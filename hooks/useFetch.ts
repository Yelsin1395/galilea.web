import { useCallback, useEffect, useState } from 'react'

interface UseFetchParams {
	service: (...args: any) => Promise<any>
}

function useFetch({ service }: UseFetchParams) {
	const [response, setResponse] = useState<any[] | Object | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	const fetchData = useCallback(async () => {
		setIsLoading(true)
		try {
			setResponse(await service())
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return [response, isLoading]
}

export default useFetch
