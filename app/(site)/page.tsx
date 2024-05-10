'use client'

import { useState, useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import Carousel from '@/components/carousel/carousel'
import { CardVisitTracking } from '@/components/card/card'
import { VisitHistorie, search } from '@/services/visitHistories.service'
import { datetime } from '@/common/helpers'

export default function Home() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [visitHistories, setVisitHistories] = useState<VisitHistorie[]>([])

	const searchVisitHistories = useCallback(async () => {
		try {
			setIsLoading(true)
			const { data, error } = await search(null)

			if (error) toast.error(error.message)
			if (data) setVisitHistories(data ?? [])
		} catch (error) {
			toast.error(JSON.stringify(error))
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		searchVisitHistories()
	}, [searchVisitHistories])

	return (
		<>
			<Carousel />
			<section className='section'>
				<section className='hero'>
					<div className='hero-body'>
						<p className='title'>Últimas 30 visitas</p>
					</div>
				</section>

				<div className='fixed-grid has-4-cols has-1-cols-mobile'>
					<div className='grid'>
						{visitHistories.map((vh) => (
							<div className='cell' key={vh.id}>
								<CardVisitTracking
									plate={vh.plateNumber}
									vehicle={vh.vehicleType}
									input={datetime(vh.dateTimeEntry)}
									output={vh.dateTimeExit ? datetime(vh.dateTimeExit) : '-'}
								/>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	)
}
