import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { DocumentType } from '@common/enums/documentType.enum'
import { InputOwnerForm } from '@common/interfaces/inputOwnerForm.interface'
import { cn } from '@/utils/merge'
import { CreateOwnerRequest } from '@common/interfaces/client/createOwnerRequest.interface'
import { areAllFieldsFilled } from '@/common/helpers'

interface CreateVisitProps {
	emitCloseModal: () => void
	isEdit: boolean
	id?: string
}

const API_ENDPOINT = '/api/owner/create'
const fetcher = (url: string, { arg }: { arg: CreateOwnerRequest }) =>
	fetch(url, { method: 'POST', body: JSON.stringify(arg) }).then((res) => res.json())

export default function CreateOwner({ emitCloseModal, isEdit, id }: CreateVisitProps) {
	const { trigger, isMutating } = useSWRMutation(API_ENDPOINT, fetcher)
	const { register, watch, handleSubmit } = useForm<InputOwnerForm>()
	const documentTypesArray: DocumentType[] = Object.values(DocumentType)

	const onSubmitForm: SubmitHandler<InputOwnerForm> = async (entry) => {
		const response = await trigger(entry)
    console.log({response})
		if (response.status !== 201) {
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
							<label className='label'>Tipo documento</label>
							<div className='select is-fullwidth'>
								<select {...register('documentType')}>
									{documentTypesArray.map((type, index) => (
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
							<label className='label'>Número documento</label>
							<div className='control'>
								<input
									className='input'
									type='text'
									placeholder='Ingrese número documento'
									{...register('documentNumber')}
								/>
							</div>
						</div>
					</div>

					<div className='cell'>
						<div className='field'>
							<label className='label'>Número telefono</label>
							{/* <div className='control'>
								<input
									className='input'
									type='text'
									placeholder='Ingrese número de teléfono'
									{...register('phoneNumber')}
								/>
							</div> */}
							<div className='field has-addons'>
								<p className='control'>
									<a className='button is-static'>+51</a>
								</p>
								<p className='control is-expanded'>
									<input
										className='input'
										type='tel'
										placeholder='Ingrese número de teléfono'
										{...register('phoneNumber')}
									/>
								</p>
							</div>
						</div>
					</div>

					<div className='cell'>
						<div className='field'>
							<label className='label'>Manzana propiedad</label>
							<div className='control'>
								<input
									className='input'
									type='text'
									placeholder='Ingrese manzana'
									{...register('propertyBlock')}
								/>
							</div>
						</div>
					</div>

					<div className='cell'>
						<div className='field'>
							<label className='label'>Lote propiedad</label>
							<div className='control'>
								<input
									className='input'
									type='text'
									placeholder='Ingrese lote'
									{...register('propertyLot')}
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
