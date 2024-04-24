import { supabase } from '@/providers/supabaseProvider'

const TABLE_NAME = 'visits'

export interface Visit {
	id?: string
	userId?: string
	name: string
	surname: string
	documentType: string
	documentNumer: string
	create_at?: string
}

export const getAll = async () => supabase.from(TABLE_NAME).select()

export const getById = async (id: string) => supabase.from(TABLE_NAME).select().eq('id', id)

export const create = async (payload: Visit) =>
	supabase.from(TABLE_NAME).insert(payload).select('id')
