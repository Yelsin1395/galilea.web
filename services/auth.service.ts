import { AuthTokenResponsePassword } from '@supabase/supabase-js'
import { supabase } from '@/providers/supabaseProvider'

export const login = async (
	email: string,
	password: string
): Promise<AuthTokenResponsePassword> => {
	return supabase.auth.signInWithPassword({
		email,
		password,
	})
}
