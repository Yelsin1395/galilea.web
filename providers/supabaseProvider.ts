import { createClient } from '@supabase/supabase-js'
import { cfg } from '@/configs/environment'

export const supabase = createClient(
	cfg.NEXT_PUBLIC_SUPABASE_BASE_URL || '',
	cfg.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)
