import { catchError, firstValueFrom, mergeMap, of } from 'rxjs'
import { httpServicePoint as http } from './http'
import { CreateServicePointRequest } from '@common/interfaces/client/createServicePointRequest.interface'

export const listServicePoint = () =>
	firstValueFrom(
		http.get('/list').pipe(
			mergeMap((response: any) => response.json()),
			catchError((error) => {
				console.error(error.message)
				return of(error)
			})
		)
	)

export const createServicePoint = (payload: CreateServicePointRequest) =>
	firstValueFrom(
		http.post('/create', payload).pipe(
			mergeMap((response: any) => response.json()),
			catchError((error) => {
				console.error(error.message)
				return of(error)
			})
		)
	)

export const deleteServicePoint = (id: string) =>
	firstValueFrom(
		http.delete(`/delete/${id}`).pipe(
			mergeMap((response: any) => response.json()),
			catchError((error) => {
				console.error(error.message)
				return of(error)
			})
		)
	)
