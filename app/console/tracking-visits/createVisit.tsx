import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { user$ } from '@/store/auth.store'
import { getByDocument, create as createVisit, Visit } from '@/services/visitSupabase.service'
import { create as createVisitHistories } from '@/services/visitHistories.service'
import { getDni } from '@/services/apisperu.service'
import {
	dateCurrentUTC,
	isEmptyString,
	convertToUpperCase,
	areAllFieldsFilled,
} from '@/common/helpers'
import { cn } from '@/utils/merge'

interface CreateVisitProps {
	emitCloseModal: () => void
}

type InputsFrom = {
	documentType: string
	documentNumber: string
	name: string
	surname: string
	vehicleType: string
	plateNumber: string
}

export default function CreateVisit({ emitCloseModal }: CreateVisitProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false)
	const [isShowFrom, setIsShowForm] = useState<boolean>(false)
	const [visit, setVisit] = useState<Visit | null>(null)
	const [visitFound, setVisitFound] = useState<boolean>(false)
	const [isSavedDb, setIsSaveDb] = useState<boolean>(false)
	const { id } = user$.getValue()
	const {
		register,
		handleSubmit,
		watch,
		getValues,
		setValue,
		formState: { errors },
	} = useForm<InputsFrom>()

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

		setIsLoadingSearch(true)
		const { data } = await getByDocument(documentType, documentNumber)

		if (data?.length) {
			setVisit(data[0])
			setValue('name', data[0].name)
			setValue('surname', data[0].surname)
			setVisitFound(true)
			setIsSaveDb(true)

			setIsLoadingSearch(false)
			setIsShowForm(true)
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

			complete: () => {
				setIsLoadingSearch(false)
				setIsShowForm(true)
			},
		})
	}

	const onSubmitForm: SubmitHandler<InputsFrom> = async (entry) => {
		try {
			if (!areAllFieldsFilled({ documentNumber: entry.documentNumber, name: entry.name })) {
				return
			}

			setIsLoading(true)
			let visitId = null

			if (!isSavedDb) {
				const payloadVisit = {
					userId: id,
					name: convertToUpperCase(entry.name),
					surname: convertToUpperCase(entry.surname),
					documentType: entry.documentType,
					documentNumber: convertToUpperCase(entry.documentNumber),
				}

				const { data } = await createVisit(payloadVisit)

				if (data?.length) {
					visitId = data[0].id
				}
			}

			const payloadTrackingVisit = {
				userId: id,
				visitId: visitId ?? visit?.id,
				dateTimeEntry: dateCurrentUTC(),
				dateTimeExit: null,
				vehicleType: entry.vehicleType,
				plateNumber: isEmptyString(entry.plateNumber)
					? null
					: convertToUpperCase(entry.plateNumber),
			}

			await createVisitHistories(payloadTrackingVisit)

			toast.success('Se ha registrado correctamente la visita')
			emitCloseModal()
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
