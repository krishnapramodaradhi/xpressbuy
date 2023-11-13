import { createClient } from '@supabase/supabase-js'

export const db = createClient(import.meta.env.VITE_DB_URL, import.meta.env.VITE_DB_KEY)