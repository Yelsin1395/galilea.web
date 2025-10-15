'use client'

import { useState } from 'react'
import useSwr from 'swr'
import { datetime } from '@common/helpers'
import { LoadingGrid } from '@/components/loading/loading'
import { FaInfo } from 'react-icons/fa6'
import { LuPencil } from 'react-icons/lu'
import { FaTrashAlt } from 'react-icons/fa'
import ModalCard from '@components/modalCard/modalCard'
import CreateOwner from './createOwner'
import { HeroGridMessage } from '@/components/hero/hero'

const API_ENDPOINT = '/api/owner/list'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Owners() {
	const [showModal, setShowModal] = useState<boolean>(false)

	const { data, isLoading, mutate } = useSwr(API_ENDPOINT, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 0,
	})

	const columns = ['N°', 'Manzana', 'Lote', 'Nombres Completos', 'Creado', 'Acciones']

	const onCloseModalForm = () => {
		setShowModal(false)
		mutate()
	}

	return (
		<section className='section'>
			<ModalCard
				title='Registrar propietario'
				isActive={showModal}
				onClose={() => setShowModal(false)}
			>
				<CreateOwner emitCloseModal={onCloseModalForm} isEdit={false} />
			</ModalCard>

			<section className='hero has-background-primary-light mb-4 hero-dark-theme'>
				<nav className='level'>
					<div className='level-left'>
						<div className='level-item'>
							<div className='hero-body'>
								<p className='title'>Propietarios</p>
								<p className='subtitle is-size-7-mobile'>Gestión de propietarios de Vista Alegre</p>
							</div>
						</div>
					</div>

					<div className='level-right'>
						<div className='level-item'>
							<div className='hero-body'>
								<button className='button has-text-weight-bold' onClick={() => setShowModal(true)}>
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
				) : data?.data.length ? (
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
								{data.data.map((o: any, i: any) => (
									<tr key={o._id}>
										<td>{i + 1}</td>
										<td>{o.propertyBlock}</td>
										<td>{o.propertyLot}</td>
										<td>{o.fullName}</td>
										<td>{datetime(o.createdAt)}</td>
										<td>
											<div className='buttons'>
												<button className='button is-small is-info' disabled>
													<FaInfo />
												</button>

												<button className='button is-small is-warning' disabled>
													<LuPencil />
												</button>

												<button className='button is-small is-danger' disabled>
													<FaTrashAlt />
												</button>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<HeroGridMessage description='Se requiere creación de propietarios' />
				)}
			</div>
		</section>
	)
}
