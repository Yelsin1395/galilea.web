import { useRouter } from 'next/navigation'
import { CiFolderOn } from 'react-icons/ci'

interface HeroGridProps {
	description: string
	isRedirect?: boolean
	hrefRedirect?: string
	redirectName?: string
}
export function HeroGridMessage({
	description,
	isRedirect,
	hrefRedirect,
	redirectName,
}: HeroGridProps) {
	const navigate = useRouter()

	const onRedirectTo = () => {
		navigate.push(String(hrefRedirect))
	}

	return (
		<section className='hero is-medium'>
			<div className='hero-body'>
				<div className='container has-text-centered'>
					<p className='title'>
						<CiFolderOn />
					</p>
					<p className='subtitle'>{description}</p>
					{isRedirect && (
						<button className='button is-link' onClick={() => onRedirectTo()}>
							Ir a {redirectName}
						</button>
					)}
				</div>
			</div>
		</section>
	)
}
