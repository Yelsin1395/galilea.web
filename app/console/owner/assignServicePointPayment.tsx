import { SubmitHandler, useForm } from 'react-hook-form'
import useSWR from 'swr'
import { HeroGridMessage } from '@/components/hero/hero'
import { LoadingGrid } from '@/components/loading/loading'
import { SubscriptionType } from '@common/enums/subscriptionType.enum'
import { InputServicePointPaymentForm } from '@common/interfaces/inputServicePointPaymentForm.interface'
import toast from 'react-hot-toast'
import useSWRMutation from 'swr/mutation'
import { cn } from '@/utils/merge'
import { CreateServicePointPaymentRequest } from '@common/interfaces/client/createServicePointPaymentRequest.interface'

interface AssignServicePointPaymentProps {
	emitCloseModal: () => void
	ownerId: string
	firstName: string
	lastName: string
	propertyBlock: string
	propertyLot: string
}

const API_ENDPOINT_LIST = '/api/servicePoint/list'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const API_ENDPOINT_SPP_CREATE = '/api/servicePointPayment/create'
const fetcherSPP = (url: string, { arg }: { arg: CreateServicePointPaymentRequest }) =>
	fetch(url, { method: 'POST', body: JSON.stringify(arg) }).then((res) => res.json())

export default function AssignServicePointPayment({
	emitCloseModal,
	ownerId,
	firstName,
	lastName,
	propertyBlock,
	propertyLot,
}: AssignServicePointPaymentProps) {
	const { data, isLoading } = useSWR(API_ENDPOINT_LIST, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 0,
	})

	const { trigger, isMutating } = useSWRMutation(API_ENDPOINT_SPP_CREATE, fetcherSPP)

	const { register, handleSubmit } = useForm<InputServicePointPaymentForm>()

	const subscriptionTypeArray = Object.keys(SubscriptionType)

	const onSubmitForm: SubmitHandler<InputServicePointPaymentForm> = async (entry) => {
		const payload: CreateServicePointPaymentRequest = {
			ownerId,
			servicePointId: entry.servicePointId,
			// @ts-ignore
			subscriptionType: SubscriptionType[entry.subscriptionType],
		}

		const response = await trigger(payload)
		console.log({ response })
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

	return isLoading ? (
		<LoadingGrid />
	) : data?.data.length ? (
		<form onSubmit={handleSubmit(onSubmitForm)}>
			<div className='fixed-grid has-2-cols'>
				<div className='grid'>
					<div className='cell'>
						<div className='field'>
							<label className='label'>Nombre</label>
							<div className='control'>
								<input className='input' type='text' disabled defaultValue={firstName} />
							</div>
						</div>
					</div>

					<div className='cell'>
						<div className='field'>
							<label className='label'>Apellido</label>
							<div className='control'>
								<input className='input' type='text' disabled defaultValue={lastName} />
							</div>
						</div>
					</div>

					<div className='cell'>
						<div className='field'>
							<label className='label'>Manzana</label>
							<div className='control'>
								<input className='input' type='text' disabled defaultValue={propertyBlock} />
							</div>
						</div>
					</div>

					<div className='cell'>
						<div className='field'>
							<label className='label'>Lote</label>
							<div className='control'>
								<input className='input' type='text' disabled defaultValue={propertyLot} />
							</div>
						</div>
					</div>

					<div className='cell'>
						<div className='field'>
							<label className='label'>Tipo punto de servicio</label>
							<div className='select is-fullwidth'>
								<select {...register('servicePointId')}>
									{data.data.map((sp: any) => (
										<option key={sp._id} value={sp._id}>
											{sp.type}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					<div className='cell'>
						<div className='field'>
							<label className='label'>Tipo de suscripción</label>
							<div className='select is-fullwidth'>
								<select {...register('subscriptionType')}>
									{subscriptionTypeArray.map((sub: any) => (
										<option key={sub} value={sub}>
											{sub}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					<div className='cell mt-4'>
						<div className='field'>
							<button className={cn('button is-success', isMutating && 'is-loading')} type='submit'>
								Asignar
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	) : (
		<HeroGridMessage
			description='No cuenta con puntos de servicios'
			isRedirect={true}
			hrefRedirect='/console/servicePoint'
			redirectName='punto de servicio'
		/>
	)
}
