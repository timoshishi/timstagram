import { supabase } from '../../../lib/initSupabase';
// import { getSession } from 'next-auth/react';
export default async function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res);
  // const session = await getSession({ req });
}
