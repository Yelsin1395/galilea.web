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

export function CardOwner() {
  return (
    <div className='card'>
      <div className='card-content'>
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img
                src="https://bulma.io/assets/images/placeholders/96x96.png"
                alt="Placeholder image"
              />
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">John Smith</p>
            <p className="subtitle is-6">@johnsmith</p>
          </div>
        </div>

        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris. <a>@bulmaio</a>. <a href="#">#css</a>
          <a href="#">#responsive</a>
          <br />
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>

      
    </div>
  )
}
