import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import './carousel.scss'

export default function Carousel() {
	const [sliderRef] = useKeenSlider(
		{
			loop: true,
		}
		// [
		// 	(slider) => {
		// 		let timeout: any
		// 		let mouseOver = false
		// 		function clearNextTimeout() {
		// 			clearTimeout(timeout)
		// 		}
		// 		function nextTimeout() {
		// 			clearTimeout(timeout)
		// 			if (mouseOver) return
		// 			timeout = setTimeout(() => {
		// 				slider.next()
		// 			}, 2000)
		// 		}
		// 		slider.on('created', () => {
		// 			slider.container.addEventListener('mouseover', () => {
		// 				mouseOver = true
		// 				clearNextTimeout()
		// 			})
		// 			slider.container.addEventListener('mouseout', () => {
		// 				mouseOver = false
		// 				nextTimeout()
		// 			})
		// 			nextTimeout()
		// 		})
		// 		slider.on('dragStarted', clearNextTimeout)
		// 		slider.on('animationEnded', nextTimeout)
		// 		slider.on('updated', nextTimeout)
		// 	},
		// ]
	)

	return (
		<>
			<div ref={sliderRef} className='keen-slider'>
				<div className='keen-slider__slide number-slide1'>
					<Image
						fill
						src='https://res.cloudinary.com/dwvc88n4u/image/upload/v1715301668/vista-alegre/cuadra-ibis-web_lirhem.png'
						alt='port-vista'
						priority
						style={{ objectFit: 'cover' }}
					/>
				</div>
				{/* <div className='keen-slider__slide number-slide2'>2</div>
				<div className='keen-slider__slide number-slide3'>3</div>
				<div className='keen-slider__slide number-slide4'>4</div>
				<div className='keen-slider__slide number-slide5'>5</div>
				<div className='keen-slider__slide number-slide6'>6</div> */}
			</div>
		</>
	)
}
