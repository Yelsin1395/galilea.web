import { BehaviorSubject } from 'rxjs'
import { Session, User } from '@supabase/supabase-js'

export const session$ = new BehaviorSubject<Session | null>(null)
export const user$ = new BehaviorSubject<User | null>(null)
