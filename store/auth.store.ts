import { BehaviorSubject } from 'rxjs'
import { User } from '@supabase/supabase-js'

export const user$ = new BehaviorSubject<User | any | null>(null)
