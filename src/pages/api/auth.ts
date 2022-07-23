/**
 * NOTE: this file is only needed if you're doing SSR (getServerSideProps)!
 */
import { NextApiHandler } from 'next';
import { supabase } from '../../lib/initSupabase';
const handler: NextApiHandler = async (req, res) => {
  await supabase.auth.api.setAuthCookie(req, res);
};
export default handler;
