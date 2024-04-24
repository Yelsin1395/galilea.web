import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { httpApisPeru as http } from './http'
import { cfg } from '@/configs/environment'

const token = cfg.NEXT_PUBLIC_TOKEN_APIS_PERU

// interface ResponseDni {
// 	success: boolean
// 	dni: string
// 	nombres: string
// 	apellidoPaterno: string
// 	apellidoMaterno: string
// 	codVerifica: number
// }

export const getDni = (number: string) =>
	http.get(`/dni/${number}?token=${token}`).pipe(
		mergeMap((response: any) => response.json()),
		catchError((error) => {
			console.error(error.message)
			return of(error)
		})
	)
