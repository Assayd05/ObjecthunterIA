import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ycpqoswkqlyefyqekuox.supabase.co'
const supabaseAnonKey = 'sb_publishable_AoM1DXErLtG8e0u0J_AUSQ_GEu6_gJ9'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
