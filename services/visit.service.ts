import { catchError, firstValueFrom, mergeMap, of } from 'rxjs'
import { httpVisitMs as http } from './http'
import { CreateVisitRequest } from '@/common/interfaces/client/createVisitRequest.interface'
import { ValidationRequest } from '@/common/interfaces/client/validationRequest.interface'

export const listVisits = () =>
	firstValueFrom(
		http.get('/list').pipe(
			mergeMap((response: any) => response.json()),
			catchError((error) => {
				console.error(error.message)
				return of(error)
			})
		)
	)

export const validationVisit = (payload: ValidationRequest) =>
	firstValueFrom(
		http.post('/validation', payload).pipe(
			mergeMap((response: any) => response.json()),
			catchError((error) => {
				console.error(error.message)
				return of(error)
			})
		)
	)

export const registerVisit = (payload: CreateVisitRequest) =>
	firstValueFrom(
		http.post('/create', payload).pipe(
			mergeMap((response: any) => response.json()),
			catchError((error) => {
				console.error(error.message)
				return of(error)
			})
		)
	)
