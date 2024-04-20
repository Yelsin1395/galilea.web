'use client'

import Carousel from '@/components/carousel/carousel'

export default function Home() {
	return (
		<>
			<Carousel />
			<section className='section'>
				<section className='hero'>
					<div className='hero-body'>
						<p className='title'>Últimas 30 visitas</p>
					</div>
				</section>
			</section>
		</>
	)
}
