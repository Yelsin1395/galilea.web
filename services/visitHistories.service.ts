import { supabase } from '@/providers/supabaseProvider'
import { DateTime } from 'next-auth/providers/kakao'

const TABLE_NAME = 'visit-histories'

export interface VisitHistorie {
	id?: string
	userId?: string
	visitId?: string
	dateTimeEntry: DateTime
	dateTimeExit?: DateTime
	vehicleType: string
	plateNumber: string
	create_at?: string
}

export const search = async () => supabase.from(TABLE_NAME).select()

export const getByVisitId = async (visitId: string) =>
	supabase.from(TABLE_NAME).select('*').eq('visitId', visitId)

export const create = async (payload: VisitHistorie) =>
	supabase.from(TABLE_NAME).insert(payload).select('id')