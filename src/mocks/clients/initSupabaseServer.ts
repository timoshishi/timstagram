import { createClient } from '@supabase/supabase-js';

/****** SERVER SIDE ONLY! ******/
const supabaseServer = createClient('process.env.NEXT_PUBLIC_SUPABASE_URL'!, 'process.env.SERVICE_KEY!');

export default supabaseServer;
