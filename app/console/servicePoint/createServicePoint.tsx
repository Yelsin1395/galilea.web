import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { CreateServicePointRequest } from '@common/interfaces/client/createServicePointRequest.interface'
import { InputServicePointForm } from '@common/interfaces/inputServicePointForm.interface'
import { ServicePointType } from '@common/enums/servicePointType.enum'
import { cn } from '@/utils/merge'
import { areAllFieldsFilled } from '@common/helpers'

interface CreateVisitProps {
	emitCloseModal: () => void
	isEdit: boolean
	id?: string
}

const API_ENDPOINT = '/api/servicePoint/create'
const fetcher = (url: string, { arg }: { arg: CreateServicePointRequest }) =>
	fetch(url, { method: 'POST', body: JSON.stringify(arg) }).then((res) => res.json())

export default function CreateServicePoint({ emitCloseModal, isEdit, id }: CreateVisitProps) {
	const { trigger, isMutating } = useSWRMutation(API_ENDPOINT, fetcher)
	const { register, handleSubmit, watch } = useForm<InputServicePointForm>({ mode: 'onChange' })
	const servicePointTypeArray: ServicePointType[] = Object.values(ServicePointType)

	const onSubmitForm: SubmitHandler<InputServicePointForm> = async (entry) => {
		entry.price = Number(entry.price)

		const response = await trigger(entry)

		if (response.status != 201) {
			if (response.errorCode) {
				toast.error(response.message)
			} else {
				toast.error(response.statusCode)
			}
		} else {
			toast.success('Se ha registrado correctamente')
			emitCloseModal()
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmitForm)}>
			<div className='fixed-grid has-2-cols'>
				<div className='grid'>
					<div className='cell'>
						<div className='field'>
							<label className='label'>Tipo punto de servicio</label>
							<div className='select is-fullwidth'>
								<select {...register('type')}>
									{servicePointTypeArray.map((type, index) => (
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
							<label className='label'>Precio</label>
							<div className='control'>
								<input
									className='input'
									type='text'
									pattern='^\d*(\.\d{0,2})?'
									placeholder='Ingrese precio'
									{...register('price')}
								/>
							</div>
						</div>
					</div>

					<div className='cell'>
						<div className='field'>
							<label className='label'>Descripción</label>
							<div className='control'>
								<input
									className='input'
									type='text'
									placeholder='Ingrese descripción'
									{...register('description')}
								/>
							</div>
						</div>
					</div>

					<div className='cell is-col-span-2 mt-4'>
						<div className='field'>
							<button
								className={cn('button is-success', isMutating && 'is-loading')}
								disabled={!areAllFieldsFilled(watch())}
								type='submit'
							>
								Guardar
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}
