'use client'

import { user$ } from '@/store/auth.store'

export default function Home() {
	const { email } = user$.getValue()

	return (
		<section className='section'>
			<section className='hero'>
				<div className='hero-body'>
					<p className='title'>Bienvenido {email}</p>
					<p className='subtitle'>
						Consola que permite la gestion de la urbanización <strong>Vista Alegre</strong>
					</p>
				</div>
			</section>
		</section>
	)
}
