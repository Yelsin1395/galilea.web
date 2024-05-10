import { DateTime } from 'next-auth/providers/kakao'
import { supabase } from '@/providers/supabaseProvider'
import { convertToUpperCase } from '@/common/helpers'

const TABLE_NAME = 'visit-histories'

export interface VisitHistorie {
	id?: string
	userId?: string
	visitId?: string
	dateTimeEntry: DateTime
	dateTimeExit?: DateTime | null
	vehicleType: string
	plateNumber?: string | null
	create_at?: string
}

export interface IFilter {
	visitId?: string
	plateNumber?: string
}

export const search = async (filter: IFilter | null) => {
	let query = supabase
		.from(TABLE_NAME)
		.select()
		.order('dateTimeEntry', { ascending: false })
		.range(0, 30)

	if (filter?.visitId) query = query.eq('visitId', filter.visitId)
	if (filter?.plateNumber) query = query.eq('plateNumber', convertToUpperCase(filter.plateNumber))

	return query
}

export const getByVisitId = async (visitId: string) =>
	supabase.from(TABLE_NAME).select('*').eq('visitId', visitId)

export const create = async (payload: VisitHistorie) =>
	supabase.from(TABLE_NAME).insert(payload).select('id')

export const update = async (id: string, entry: VisitHistorie) =>
	supabase.from(TABLE_NAME).update(entry).eq('id', id)
