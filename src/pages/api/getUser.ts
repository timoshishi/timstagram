import { supabase } from '../../lib/initSupabase';
import { NextApiHandler } from 'next';

// Example of how to verify and get user data server-side.
const getUser: NextApiHandler = async (req, res) => {
  const token = req.headers.token;

  const { data: user, error } = await supabase.auth.api.getUser(token as string);

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(user);
};

export default getUser;
