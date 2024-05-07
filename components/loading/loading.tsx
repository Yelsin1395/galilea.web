import { BounceLoader, BeatLoader } from 'react-spinners'
import './loading.scss'

const colorSpin = '#d62739'

export const LoadingFullPage = () => {
	return (
		<div className='content-full-loading'>
			<BounceLoader color={colorSpin} loading />
		</div>
	)
}

export const LoadingGrid = () => {
	return (
		<div className='has-text-centered'>
			<BeatLoader color={colorSpin} />
		</div>
	)
}
