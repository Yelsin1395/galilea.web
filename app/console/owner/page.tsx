'use client'

import { useState } from 'react'
import useSwr from 'swr'
import { datetime } from '@common/helpers'
import { LoadingGrid } from '@/components/loading/loading'
import { FaRegEye } from 'react-icons/fa6'
import ModalCard from '@components/modalCard/modalCard'
import CreateOwner from './createOwner'
import { HeroGridMessage } from '@/components/hero/hero'
import AssignServicePointPayment from './assignServicePointPayment'
import { FiUserCheck } from 'react-icons/fi'
import ListServicePointPayment from './listServicePointPayment'

const API_ENDPOINT = '/api/owner/list'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Owners() {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [activeOwnerAssignId, setActiveOwnerAssignId] = useState<string | null>(null)
	const [activeOwnerTracking, setActiveOwnerTracking] = useState<string | null>(null)

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

	const openModalAssignSp = (ownerId: string) => {
		setActiveOwnerAssignId(ownerId)
	}

	const onCloseModalAssignSp = () => {
		setActiveOwnerAssignId(null)
	}

	const openModalTrackingSpp = (ownerId: string) => {
		setActiveOwnerTracking(ownerId)
	}

	const onCloseModalTranckinSpp = () => {
		setActiveOwnerTracking(null)
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
												<button
													className='button is-small is-info'
													onClick={() => openModalAssignSp(o._id)}
												>
													<FiUserCheck />
												</button>

												<button
													className='button is-small is-link'
													onClick={() => openModalTrackingSpp(o._id)}
												>
													<FaRegEye />
												</button>

												{/* <button className='button is-small is-danger' disabled>
													<FaTrashAlt />
												</button> */}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<HeroGridMessage description='Se requiere creación de propietarios' isRedirect={false} />
				)}
			</div>

			{data?.data.length &&
				data.data.map((o: any, i: any) => (
					<ModalCard
						key={`info-modal-${o._id}`}
						title='Asignar punto de servicio'
						isActive={activeOwnerAssignId === o._id}
						onClose={() => setActiveOwnerAssignId(null)}
					>
						<AssignServicePointPayment
							emitCloseModal={onCloseModalAssignSp}
							ownerId={o._id}
							firstName={o.firstName}
							lastName={o.lastName}
							propertyBlock={o.propertyBlock}
							propertyLot={o.propertyLot}
						/>
					</ModalCard>
				))}

			{data?.data.length &&
				data.data.map((o: any, i: any) => (
					<ModalCard
						key={`info-modal-${o._id}`}
						title={`Puntos de servicios de ${o.propertyBlock} ${o.propertyLot}`}
						isActive={activeOwnerTracking === o._id}
						onClose={() => setActiveOwnerTracking(null)}
					>
						<ListServicePointPayment emitCloseModal={onCloseModalTranckinSpp} ownerId={o._id} />
					</ModalCard>
				))}
		</section>
	)
}
