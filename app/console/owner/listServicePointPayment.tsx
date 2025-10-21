import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import {
	StatusServicePointPayment,
	ColorStatusServicePointPayment,
} from '@/common/enums/statusServicePointPaymentType.enum'
import { LoadingGrid } from '@/components/loading/loading'
import { BsPencilSquare } from 'react-icons/bs'
import { FaTrashAlt } from 'react-icons/fa'
import { DeleteServicePointPaymentRequest } from '@/common/interfaces/client/deleteServicePointPaymentRequest.interface'
import toast from 'react-hot-toast'
import { cn } from '@/utils/merge'
import { HeroGridMessage } from '@/components/hero/hero'

interface ListServicePointPaymentProps {
	emitCloseModal: () => void
	ownerId: string
}

const API_ENDPOINT_LIST = '/api/servicePointPayment/list'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

const API_ENDPOINT_DELETE = '/api/servicePointPayment/delete'
const fetcherDelete = (url: string, { arg }: { arg: DeleteServicePointPaymentRequest }) =>
	fetch(`${url}/${arg.id}/${arg.ownerId}`, { method: 'DELETE' }).then((res) => res.json())

export default function ListServicePointPayment({
	emitCloseModal,
	ownerId,
}: ListServicePointPaymentProps) {
	const { data, isLoading } = useSWR(`${API_ENDPOINT_LIST}/${ownerId}`, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		refreshInterval: 0,
	})

	const { trigger, isMutating } = useSWRMutation(API_ENDPOINT_DELETE, fetcherDelete)

	const columns = [
		'N°',
		'Estado',
		'Tipo',
		'Precio',
		'Forma pago',
		'Total',
		'Último pago',
		'Próximo pago',
		'Acciones',
	]

	const onDelete = async (id: string, ownerId: string) => {
		const response = await trigger({ id, ownerId })

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

	return isLoading ? (
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
					{data.data.map((spp: any, i: any) => (
						<tr key={spp._id}>
							<td>{i + 1}</td>
							<td>
								{/* @ts-ignore */}
								<span className={cn('tag', ColorStatusServicePointPayment[spp.serviceStatus])}>
									{/* @ts-ignore */}
									{StatusServicePointPayment[spp.serviceStatus]}
								</span>
							</td>
							<td>{spp.servicePointType}</td>
							<td>{spp.servicePointPrice}</td>
							<td>{spp.subscriptionType}</td>
							<td>{spp.totalPaymentBySubscription}</td>
							<td>{spp.lastPayment}</td>
							<td>{spp.nextPayment}</td>
							<td>
								<div className='buttons'>
									<button className='button is-small is-warning' disabled>
										<BsPencilSquare />
									</button>

									<button
										className={cn('button is-small is-danger', isMutating && 'is-loading')}
										onClick={() => onDelete(spp._id, ownerId)}
									>
										<FaTrashAlt />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	) : (
		<HeroGridMessage description='Asigne un punto de servicio' isRedirect={false} />
	)
}
