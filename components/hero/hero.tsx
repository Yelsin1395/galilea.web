import { CiFolderOn } from 'react-icons/ci'

interface HeroGridProps {
	description: string
}
export function HeroGridMessage({ description }: HeroGridProps) {
	return (
		<section className='hero is-medium'>
			<div className='hero-body'>
				<div className='container has-text-centered'>
					<p className='title'>
						<CiFolderOn />
					</p>
					<p className='subtitle'>{description}</p>
				</div>
			</div>
		</section>
	)
}
