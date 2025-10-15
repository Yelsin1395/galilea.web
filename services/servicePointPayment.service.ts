import { catchError, firstValueFrom, mergeMap, of } from 'rxjs'
import { httpServicePointPayment as http } from './http'
import { CreateServicePointPaymentRequest } from '@common/interfaces/client/createServicePointPaymentRequest.interface'

export const createServicePointPayment = (payload: CreateServicePointPaymentRequest) =>
	firstValueFrom(
		http.post('/create', payload).pipe(
			mergeMap((response: any) => response.json()),
			catchError((error) => {
				console.error(error.message)
				return of(error)
			})
		)
	)
