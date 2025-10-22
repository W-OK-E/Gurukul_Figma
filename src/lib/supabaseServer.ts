// lib/supabaseServer.ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL!
const key = process.env.SUPABASE_SERVICE_ROLE ?? process.env.SUPABASE_ANON_KEY!

export const supabaseServer = createClient(url, key)
