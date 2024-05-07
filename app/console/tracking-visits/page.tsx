'use client'

import { useState, useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'
import { LoadingGrid } from '@/components/loading/loading'
import ModalCard from '@/components/modalCard/modalCard'
import { VisitHistorie, search } from '@/services/visitHistories.service'
import CreateVisit from './createVisit'
import { datetime } from '@/common/helpers'

export default function Visits() {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState(true)
	const [visitHistories, setVisitHistories] = useState<VisitHistorie[]>([])
	const columns = ['Tipo', 'Placa', 'Entrada', 'Salida', 'Acciones']

	const searchVisitHistories = useCallback(async () => {
		try {
			setIsLoading(true)

			const { data, error } = await search()

			if (error) {
				toast.error(error.message)
			}

			if (data) {
				setVisitHistories(data ?? [])
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		searchVisitHistories()
	}, [searchVisitHistories])

	return (
		<section className='section'>
			<ModalCard title='Registar visita' isActive={showModal} onClose={() => setShowModal(false)}>
				<CreateVisit />
			</ModalCard>

			<section className='hero has-background-primary-light mb-4'>
				<nav className='level'>
					<div className='level-left'>
						<div className='level-item'>
							<div className='hero-body'>
								<p className='title'>Seguimiento de visitas</p>
								<p className='subtitle is-size-7-mobile'>
									Registro y control de visitas que acceden a la urbanización
								</p>
							</div>
						</div>
					</div>

					<div className='level-right'>
						<div className='level-item'>
							<div className='hero-body'>
								<button className='button' onClick={() => setShowModal(true)}>
									Registrar
								</button>
							</div>
						</div>
					</div>
				</nav>
			</section>

			<div className='box'>
				{isLoading ? (
					<LoadingGrid />
				) : (
					<div className='table-container'>
						<table className='table is-hoverable is-fullwidth'>
							<thead>
								<tr>
									{columns.map((column) => (
										<th key={column}>{column}</th>
									))}
								</tr>
							</thead>

							<tbody>
								{visitHistories.map((v) => (
									<tr key={v.id}>
										<td>{v.vehicleType}</td>
										<td>{v.plateNumber}</td>
										<td>{datetime(v.dateTimeEntry)}</td>
										<td>{v.dateTimeExit}</td>
										<td>
											<div className='buttons'>
												<button className='button is-small is-warning'>Detalle</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</section>
	)
}
