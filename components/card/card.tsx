interface CardVisitTrackingProps {
	plate: string | any
	vehicle: string
	input: string
	output: string | any
}

export function CardVisitTracking({ plate, vehicle, input, output }: CardVisitTrackingProps) {
	return (
		<div className='card'>
			<div className='card-content'>
				<p className='title'>{plate}</p>
				<p className='subtitle'>{vehicle}</p>
			</div>
			<footer className='card-footer'>
				<p className='card-footer-item'>
					<span className='has-text-weight-bold'>{input}</span>
				</p>
				<p className='card-footer-item'>
					<span className='has-text-weight-bold'>{output}</span>
				</p>
			</footer>
		</div>
	)
}
