import { DocumentType } from '@/common/enums/documentType.enum'
import { ColorStatusServicePointPayment, StatusServicePointPayment } from '@/common/enums/statusServicePointPaymentType.enum'
import { ColorStatusVisit, VisitStatusTranslateType } from '@/common/enums/visitStatusType.enum'
import { VisitTranslateType } from '@/common/enums/visitType.enum'
import { CreateVisitRequest } from '@/common/interfaces/client/createVisitRequest.interface'
import { ValidationRequest } from '@/common/interfaces/client/validationRequest.interface'
import { InputVisitForm } from '@/common/interfaces/inputVisitForm.interface'
import { cn } from '@/utils/merge'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'

interface CreateVisitProps {
	emitCloseModal: () => void
}

const API_ENDPOINT_VALIDATION = '/api/visit/validation'
const fetcherValidation = (url: string, { arg }: { arg: ValidationRequest }) =>
	fetch(url, { method: 'POST', body: JSON.stringify(arg) }).then((res) => res.json())

const API_ENDPOINT = '/api/visit/register'
const fetcher = (url: string, { arg }: { arg: CreateVisitRequest }) =>
	fetch(url, { method: 'POST', body: JSON.stringify(arg) }).then((res) => res.json())

export default function RegisterVisit({ emitCloseModal }: CreateVisitProps) {
	const [dataValidation, setDataValidation] = useState<any>(null)

	const { trigger: triggerValidation, isMutating: isMutatingValidation } = useSWRMutation(
		API_ENDPOINT_VALIDATION,
		fetcherValidation
	)
	const { trigger, isMutating } = useSWRMutation(API_ENDPOINT, fetcher)

	const { register, getValues, handleSubmit } = useForm<InputVisitForm>()

	const documentTypesArray: DocumentType[] = Object.values(DocumentType)

	const validateVisit = async () => {
		const value = getValues()

		const payload: ValidationRequest = {
			propertyBlock: value.propertyBlock,
			propertyLot: value.propertyLot,
			documentType: value.documentType,
			documentNumber: value.documentNumber,
			plateNumber: value.plateNumber,
		}

		const response = await triggerValidation(payload)

		if (response.status !== 200) {
			if (response.errorCode) {
				toast.error(response.message)
			} else {
				toast.error(response.statusCode)
			}
		} else {
			setDataValidation(response.data)
		}
	}

	const onSubmitForm: SubmitHandler<InputVisitForm> = async (entry) => {
    if (!dataValidation) {
      return
    }
    
		const payload: CreateVisitRequest = {
      ownerId: dataValidation.ownersId,
      documentType: entry.documentType,
      documentNumber: entry.documentNumber,
      fullName: dataValidation.fullName,
      propertyBlock: entry.propertyBlock,
      propertyLot: entry.propertyLot,
      visitType: dataValidation.visitType,
      visitStatus: dataValidation.visitStatus,
      plateNumber: entry.plateNumber
    }

		const response = await trigger(payload)

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
			<div className='fixed-grid has-3-cols'>
				<div className='grid'>
					<div className='cell'>
						<div className='field'>
							<label className='label'>Manzana</label>
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
							<label className='label'>Lote</label>
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

					<div className='cell'>
						<div className='field'>
							<label className='label'>Placa (opcional)</label>
							<div className='control'>
								<input
									className='input'
									type='text'
									placeholder='Ingrese placa'
									{...register('plateNumber')}
								/>
							</div>
						</div>
					</div>

					<div className='cell is-col-span-3'>
						<div className='field'>
							<label className='label'>Tipo y número</label>
							<div className='field has-addons'>
								<p className='control'>
									<span className='select'>
										<select {...register('documentType')}>
											{documentTypesArray.map((d: any) => (
												<option key={d} value={d}>
													{d}
												</option>
											))}
										</select>
									</span>
								</p>
								<p className='control is-expanded'>
									<input
										className='input'
										type='tel'
										placeholder='Ingrese número de documento'
										{...register('documentNumber')}
									/>
								</p>
								<p className='control'>
									<button
										className={cn('button is-link', isMutatingValidation && 'is-loading')}
										onClick={() => validateVisit()}
									>
										Validar
									</button>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{dataValidation && (
				<div className='fixed-grid has-3-cols'>
					<div className='grid'>
						<div className='cell'>
							<div className='field'>
								<label className='label'>Estado</label>
								<div className='control'>
                  {/* @ts-ignore */}
									<span className={cn('tag is-medium', ColorStatusVisit[dataValidation.visitStatus])}
									>
                    {/* @ts-ignore */}
										{VisitStatusTranslateType[dataValidation.visitStatus]}
									</span>
								</div>
							</div>
						</div>

						<div className='cell'>
							<div className='field'>
								<label className='label'>Estado de servicio</label>
								<div className='control'>
                  {/* @ts-ignore */}
									<span className={cn('tag is-medium', ColorStatusServicePointPayment[dataValidation.serviceStatus])}>
                    {/* @ts-ignore */}
                    {StatusServicePointPayment[dataValidation.serviceStatus]}
                  </span>
								</div>
							</div>
						</div>

            <div className='cell'>
							<div className='field'>
								<label className='label'>Tipo de visita</label>
								<div className='control'>
                  {/* @ts-ignore */}
									<input className='input' type='text' value={VisitTranslateType[dataValidation.visitType]}
										disabled
									/>
								</div>
							</div>
						</div>

						<div className='cell is-col-span-3'>
							<div className='field'>
								<label className='label'>Nombres completos</label>
								<div className='control'>
									<input className='input' type='text' value={dataValidation.fullName} disabled />
								</div>
							</div>
						</div>

            <div className='cell is-col-span-3 mt-4'>
              <div className='field'>
                <button
                  className={cn('button is-success', isMutating && 'is-loading')}
                  type='submit'
                >
                  Registrar
                </button>
              </div>
            </div>
					</div>
				</div>
			)}
		</form>
	)
}
