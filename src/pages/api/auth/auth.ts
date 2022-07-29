import { supabase } from '../../../lib/initSupabase';
import { NextApiHandler } from 'next';
// import { getSession } from 'next-auth/react';
const handler: NextApiHandler = async (req, res) => {
  // supabase.auth.api.setAuthCookie(req, res);
  // const session = await getSession({ req });
};

export default handler;
