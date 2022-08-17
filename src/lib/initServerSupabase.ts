import { createClient } from '@supabase/supabase-js';

export const supabaseService = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SERVICE_KEY!);
