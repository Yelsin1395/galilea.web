'use client'

import { ColorStatusVisit, VisitStatusTranslateType } from '@/common/enums/visitStatusType.enum'
import { VisitTranslateType } from '@/common/enums/visitType.enum'
import { datetime } from '@/common/helpers'
import { HeroGridMessage } from '@/components/hero/hero'
import { LoadingGrid } from '@/components/loading/loading'
import ModalCard from '@/components/modalCard/modalCard'
import { cn } from '@/utils/merge'
import { useState } from 'react'
import { CiSquareCheck } from 'react-icons/ci'
import { IoExitOutline } from 'react-icons/io5'
import useSWR from 'swr'
import RegisterVisit from './registerVisit'

const API_ENDPOINT = '/api/visit/list'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Visits() {
	const [showModal, setShowModal] = useState<boolean>(false)

	const { data, isLoading, mutate } = useSWR(API_ENDPOINT, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 0,
	})

	const columns = [
		'N°',
		'Manzana',
		'Lote',
		'Nombres Completos',
		'Tipo',
		'Placa',
		'Estado',
		'Entrada',
		'Salida',
		'Acciones',
	]

	const onCloseModalForm = () => {
		setShowModal(false)
		mutate()
	}

	return (
		<section className='section'>
			<ModalCard title='Registrar visita' isActive={showModal} onClose={() => setShowModal(false)}>
				<RegisterVisit emitCloseModal={onCloseModalForm} />
			</ModalCard>
			<section className='hero has-background-primary-light mb-4 hero-dark-theme'>
				<nav className='level'>
					<div className='level-left'>
						<div className='level-item'>
							<div className='hero-body'>
								<p className='title'>Visitas</p>
								<p className='subtitle is-size-7-mobile'>Gestión de visitas de Vista Alegre</p>
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
								{data.data.map((v: any, i: any) => (
									<tr key={v._id}>
										<td>{i + 1}</td>
										<td>{v.propertyBlock}</td>
										<td>{v.propertyLot}</td>
										<td>{v.fullName}</td>
										{/* @ts-ignore */}
										<td>{VisitTranslateType[v.visitType]}</td>
										<td>{v.plateNumber}</td>
										<td>
											{/* @ts-ignore */}
											<span className={cn('tag', ColorStatusVisit[v.visitStatus])}>
												{/* @ts-ignore */}
												{VisitStatusTranslateType[v.visitStatus]}
											</span>
										</td>
										<td>{datetime(v.createdAt)}</td>
										<td>{datetime(v.updatedAt)}</td>
										<td>
											<div className='buttons'>
												{v.updatedAt ? (
													<button className='button is-small is-success'>
														<CiSquareCheck />
													</button>
												) : (
													<button className='button is-small is-info'>
														<IoExitOutline />
													</button>
												)}
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<HeroGridMessage description='No hay visitas registradas' isRedirect={false} />
				)}
			</div>
		</section>
	)
}
