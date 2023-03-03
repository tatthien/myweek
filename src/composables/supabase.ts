import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_SP_URL, import.meta.env.VITE_SP_ANON_KEY)
