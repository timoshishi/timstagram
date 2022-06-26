/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */
import { supabase } from '../../lib/initSupabase';

export default async function handler(req, res) {
  await supabase.auth.api.setAuthCookie(req, res);
}
