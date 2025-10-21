'use client'

import { useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FaCheck } from 'react-icons/fa6'
import { LoadingGrid } from '@/components/loading/loading'
import ModalCard from '@/components/modalCard/modalCard'
import { VisitHistorie, search, update } from '@/services/visitHistories.service'
import { getByDocument } from '@/services/visitSupabase.service'
import CreateVisit from './createVisit'
import { datetime, dateCurrentUTC } from '@/common/helpers'
import { cn } from '@/utils/merge'

type InputsFilter = {
	visitId: string
	documentNumber: string
	plateNumber: string
}

export default function Visits() {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false)
	const [iOutput, setIOutput] = useState<number>(-1)
	const [visitHistories, setVisitHistories] = useState<VisitHistorie[]>([])
	const { register, setValue, getValues, resetField } = useForm<InputsFilter>()
	const columns = ['Tipo', 'Placa', 'Entrada', 'Salida', 'Acciones']

	const searchVisitHistories = useCallback(async () => {
		const { data, error } = await search(getValues())

		if (error) toast.error(error.message)
		if (data) setVisitHistories(data ?? [])
	}, [getValues])

	const getVisitByDocument = useCallback(
		async (documentNumber: string) => {
			const { data, error } = await getByDocument(null, documentNumber)

			if (error) toast.error(error.message)

			if (data?.length) {
				setValue('visitId', data[0].id)
			}
		},
		[setValue]
	)

	const mergeSearchs = useCallback(async () => {
		try {
			setIsLoading(true)
			setIsLoadingSearch(true)

			const { documentNumber } = getValues()

			if (documentNumber) {
				await getVisitByDocument(documentNumber)
			}

			await searchVisitHistories()
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoadingSearch(false)
			setIsLoading(false)
		}
	}, [searchVisitHistories, getVisitByDocument, getValues])

	useEffect(() => {
		mergeSearchs()
	}, [mergeSearchs])

	const onSearch = () => {
		mergeSearchs()
	}

	const onClearFilter = () => {
		resetField('documentNumber')
		resetField('plateNumber')
		setValue('visitId', '')
		onSearch()
	}

	const onCloseModalForm = () => {
		setShowModal(false)
		onSearch()
	}

	const onOutput = async (index: number, id: string, input: VisitHistorie) => {
		setIOutput(index)
		input.dateTimeExit = dateCurrentUTC()
		const result = await update(id, input)

		if (result.status === 204) {
			let i = visitHistories.findIndex((vh) => vh.id === id)

			if (i !== -1) {
				visitHistories[i] = input
				let modified = visitHistories.splice(i, 1)[0]
				visitHistories.splice(i, 0, modified)
				setVisitHistories(visitHistories)
			}
		}
		setIOutput(-1)
	}

	return (
		<section className='section'>
			<ModalCard title='Registar visita' isActive={showModal} onClose={() => setShowModal(false)}>
				<CreateVisit emitCloseModal={onCloseModalForm} />
			</ModalCard>

			<section className='hero has-background-primary-light mb-4 hero-dark-theme'>
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
								<button className='button has-text-weight-bold' onClick={() => setShowModal(true)}>
									Registrar
								</button>
							</div>
						</div>
					</div>
				</nav>
			</section>

			<div className='box'>
				<div className='fixed-grid has-3-cols has-1-cols-mobile'>
					<div className='grid'>
						<div className='cell'>
							<div className='field'>
								<label className='label'>Documento de identidad</label>
								<div className='control'>
									<input
										className='input'
										type='text'
										placeholder='Ingresa documento'
										{...register('documentNumber')}
									/>
								</div>
							</div>
						</div>

						<div className='cell'>
							<div className='field'>
								<label className='label'>Placa vehicular</label>
								<div className='control'>
									<input
										className='input'
										type='text'
										placeholder='Ingresa placa'
										{...register('plateNumber')}
									/>
								</div>
							</div>
						</div>

						<div className='cell'>
							<div className='field'>
								<label className='label has-text-white is-hidden-mobile'>Acciones</label>
								<div className='control'>
									<div className='buttons'>
										<button
											className={cn('button is-primary', isLoadingSearch && 'is-loading')}
											onClick={onSearch}
											disabled={isLoadingSearch}
										>
											Buscar
										</button>
										<button className='button is-link' onClick={onClearFilter}>
											Limpiar
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

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
								{visitHistories.map((v, i) => (
									<tr key={v.id}>
										<td>{v.vehicleType}</td>
										<td>{v.plateNumber ? v.plateNumber : '-'}</td>
										<td>{datetime(v.dateTimeEntry)}</td>
										<td>{v.dateTimeExit ? datetime(v.dateTimeExit) : '-'}</td>
										<td>
											{v.dateTimeExit ? (
												<button className='button is-small is-success' disabled>
													<FaCheck />
												</button>
											) : (
												<button
													className={cn(
														'button is-small is-warning',
														i === iOutput && 'is-loading'
													)}
													onClick={() => onOutput(i, v.id || '', v)}
												>
													Salida
												</button>
											)}
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
