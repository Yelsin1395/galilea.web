'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { LoadingGrid } from '@/components/loading/loading'
import { CardServicePoint } from '@/components/card/card'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import ModalCard from '@components/modalCard/modalCard'
import CreateServicePoint from './createServicePoint'
import { DeleteServicePointRequest } from '@common/interfaces/client/deleteServicePointRequest.interface'
import { HeroGridMessage } from '@components/hero/hero'

const API_ENDPOINT_LIST = '/api/servicePoint/list'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const API_ENDPOINT_DELETE = '/api/servicePoint/delete'
const fetcherDelete = (url: string, { arg }: { arg: DeleteServicePointRequest }) =>
	fetch(`${url}/${arg.id}`, { method: 'DELETE' }).then((res) => res.json())

export default function ServicePoints() {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [idDelete, setIdDelete] = useState<string>('')

	const { data, isLoading, mutate } = useSWR(API_ENDPOINT_LIST, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 0,
	})

	const { trigger, isMutating } = useSWRMutation(API_ENDPOINT_DELETE, fetcherDelete)

	const onDelete = async (id: string | any) => {
		setIdDelete(id)
		const response = await trigger({ id })

		if (response.status != 200) {
			if (response.errorCode) {
				toast.error(response.message)
			} else {
				toast.error(response.statusCode)
			}
		} else {
			data.data = data.data.filter((item: any) => item._id !== id)
			toast.success('Se ha eliminado correctamente')
		}
	}

	const onCloseModalForm = () => {
		setShowModal(false)
		mutate()
	}

	return (
		<section className='section'>
			<ModalCard
				title='Registrar punto de servicio'
				isActive={showModal}
				onClose={() => setShowModal(false)}
			>
				<CreateServicePoint emitCloseModal={onCloseModalForm} isEdit={false} />
			</ModalCard>

			<section className='hero has-background-primary-light hero-dark-theme mb-4'>
				<nav className='level'>
					<div className='level-left'>
						<div className='level-item'>
							<div className='hero-body'>
								<p className='title'>Punto de servicio</p>
								<p className='subtitle is-size-7-mobile'>
									Gestión de puntos de servicio de Vista Alegre
								</p>
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
					<div className='fixed-grid has-4-cols has-1-cols-mobile'>
						<div className='grid'>
							{data.data.map((sp: any, i: number) => (
								<div className='cell' key={sp._id}>
									<CardServicePoint
										id={sp._id}
										type={sp.type}
										currency={sp.currency}
										price={sp.price}
										description={sp.description}
										createdAt={sp.createdAt}
										isLoading={idDelete === sp._id && isMutating}
										emitDelete={onDelete}
									/>
								</div>
							))}
						</div>
					</div>
				) : (
					<HeroGridMessage description='Se requiere creación de punto de servicio' />
				)}
			</div>
		</section>
	)
}
