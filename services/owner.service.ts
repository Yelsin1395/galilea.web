import { catchError, firstValueFrom, mergeMap, of } from 'rxjs'
import { httpOwnerMs as http } from './http'
import { CreateOwnerRequest } from '@common/interfaces/client/createOwnerRequest.interface'

export const getAllOwner = () => firstValueFrom(
  http.get('/list').pipe(
    mergeMap((response: any) => response.json()),
    catchError((error) => {
      console.error(error.message)
      return of(error);
    })
  )
)

export const createOwner = (payload: CreateOwnerRequest) => firstValueFrom(
  http.post('/create', payload).pipe(
    mergeMap((response: any) => response.json()),
    catchError((error) => {
      console.error(error.message)
      return of(error);
    })
  )
)