import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { user$ } from '@/store/auth.store'
import { getByDocument, create as createVisit } from '@/services/visit.service'
import { create as createVisitHistories } from '@/services/visitHistories.service'
import { getDni } from '@/services/apisperu.service'
import { dateCurrentUTC, isEmptyString, convertToUpperCase } from '@/common/helpers'
import { cn } from '@/utils/merge'

type DataTypesFrom = {
	documentType: string
	documentNumber: string
	name: string
	surname: string
	vehicleType: string
	plateNumber?: string
	input: boolean
	output?: boolean
}

export default function CreateVisit() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false)
	const [isShowFrom, setIsShowForm] = useState<boolean>(false)
	const [visitId, setVisitId] = useState<string>('')
	const [visitFound, setVisitFound] = useState<boolean>(false)
	const [isSavedDb, setIsSaveDb] = useState<boolean>(false)
	const router = useRouter()
	const { id } = user$.getValue()
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		setValue,
		formState: { errors },
	} = useForm()

	const typesDocuments = ['DNI', 'RUC', 'C.E']
	const typesVehicles = [
		'Ninguno',
		'Bicimoto',
		'Motocicleta',
		'Trimoto',
		'Cuadrimoto',
		'Auto',
		'Taxi',
		'SUV',
		'Pick-Up',
		'Furgoneta',
		'Camion',
		'Maquinaria',
	]

	const onSearchVisit = async () => {
		const { documentType, documentNumber } = getValues()

		try {
			setIsLoadingSearch(true)
			const { data } = await getByDocument(documentType, documentNumber)

			if (data?.length) {
				setVisitId(data[0].id)
				setValue('name', data[0].name)
				setValue('surname', data[0].surname)
				setVisitFound(true)
				setIsSaveDb(true)
				return
			}

			getDni(documentNumber).subscribe({
				next: (value) => {
					if (value?.success) {
						setValue('name', value.nombres)
						setValue('surname', `${value.apellidoPaterno} ${value.apellidoMaterno}`)
						setVisitFound(true)
					} else {
						toast.error(value.message)
					}
				},
			})
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoadingSearch(false)
			setIsShowForm(true)
		}
	}

	const onSubmitForm = async (entry: DataTypesFrom | any) => {
		try {
			setIsLoading(true)

			if (!isSavedDb) {
				const payloadVisit = {
					userId: id,
					name: convertToUpperCase(entry.name),
					surname: convertToUpperCase(entry.surname),
					documentType: entry.documentType,
					documentNumber: convertToUpperCase(entry.documentNumber),
				}

				console.log({ payloadVisit })

				const { data } = await createVisit(payloadVisit)

				if (data?.length) {
					setVisitId(data[0].id)
				}
			}

			const payloadTrackingVisit = {
				userId: id,
				visitId: visitId,
				dateTimeEntry: entry.input && dateCurrentUTC(),
				dateTimeExit: null,
				vehicleType: entry.vehicleType,
				plateNumber: isEmptyString(entry.plateNumber)
					? null
					: convertToUpperCase(entry.plateNumber),
			}

			await createVisitHistories(payloadTrackingVisit)

			toast.success('Se ha registrado correctamente la visita')
			router.push('/console/tracking-visits')
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmitForm)}>
			<div className='field is-grouped'>
				<div className='select'>
					<select {...register('documentType')} disabled={visitFound}>
						{typesDocuments.map((type, index) => (
							<option key={index} value={type}>
								{type}
							</option>
						))}
					</select>
				</div>

				<p className='control is-expanded'>
					<input
						className='input'
						type='text'
						placeholder='Ingresa documento de identidad'
						disabled={visitFound}
						{...register('documentNumber')}
					/>
				</p>
				<p className='control'>
					<button
						className={cn(
							'button is-info',
							isLoadingSearch && 'is-loading',
							visitFound && 'is-hidden'
						)}
						type='button'
						onClick={onSearchVisit}
						disabled={String(watch('documentNumber')).length <= 7}
					>
						Buscar
					</button>
				</p>
			</div>

			{isShowFrom && (
				<div className='fixed-grid has-2-cols'>
					<div className='grid'>
						<div className='cell'>
							<div className='field'>
								<label className='label'>Nombre</label>
								<div className='control'>
									<input
										className='input'
										type='text'
										placeholder='Ingrese nombre'
										disabled={visitFound}
										{...register('name')}
									/>
								</div>
							</div>
						</div>

						<div className='cell'>
							<div className='field'>
								<label className='label'>Apellido</label>
								<div className='control'>
									<input
										className='input'
										type='text'
										placeholder='Ingrese apellido'
										disabled={visitFound}
										{...register('surname')}
									/>
								</div>
							</div>
						</div>

						<div className='cell'>
							<div className='field'>
								<label className='label'>Tipo de vehículo</label>
								<div className='select is-fullwidth'>
									<select {...register('vehicleType')}>
										{typesVehicles.map((type, index) => (
											<option key={index} value={type}>
												{type}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>

						<div className='cell'>
							<div className='field'>
								<label className='label'>Placa</label>
								<div className='control'>
									<input
										className='input'
										type='text'
										placeholder='Ingresa número o S/N'
										{...register('plateNumber')}
									/>
								</div>
							</div>
						</div>

						<div className='cell'>
							<div className='field'>
								<label className='checkbox has-text-weight-bold'>
									<input type='checkbox' {...register('input')} />
									<span className='pl-1'>Entrada</span>
								</label>
							</div>
						</div>

						<div className='cell'>
							<div className='field'>
								<label className='checkbox has-text-weight-bold'>
									<input type='checkbox' {...register('output')} disabled />
									<span className='pl-1'>Salida</span>
								</label>
							</div>
						</div>

						<div className='cell'>
							<div className='field'>
								<button
									className={cn('button is-success', isLoading && 'is-loading')}
									type='submit'
								>
									Guardar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</form>
	)
}
