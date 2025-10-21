import { supabase } from '@/providers/supabaseProvider'

const TABLE_NAME = 'visits'
export interface Visit {
	id?: string
	userId?: string
	name: string
	surname: string
	documentType: string
	documentNumber: string
	create_at?: string
}

export interface IFilter {
	documentNumber?: string
}

export const search = async (filter: IFilter) => {
	let query = supabase.from(TABLE_NAME).select()

	const { documentNumber } = filter

	if (documentNumber) query = query.eq('documentNumber', documentNumber)

	return query
}

export const getAll = async () => supabase.from(TABLE_NAME).select()

export const getById = async (id: string) => supabase.from(TABLE_NAME).select().eq('id', id)

export const getByDocument = async (type: string | null, number: string) => {
	let query = supabase.from(TABLE_NAME).select().eq('documentNumber', number)

	if (type) query = query.eq('documentType', type)

	return query
}

export const create = async (payload: Visit) =>
	supabase.from(TABLE_NAME).insert(payload).select('id')
