// delete the user with an email using supabaseClient

import { User } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseService } from '@src/lib/initServerSupabase';

/**
 * @description - deletes the user with an email using supabaseClient DANGEROUS
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, id, secret, password } = req.body;
  const { type } = req.query;
  if (secret !== process.env.SECRET) {
    throw new Error('Invalid password');
  }
  const users = await supabaseService.auth.api.listUsers();

  if (users.data === null) {
    res.status(404).json({ error: 'No users found' });
  }
  if (type === 'token') {
    const { data, error } = await supabaseService.auth.api.signInWithEmail(email, password);
    return res.status(200).json({ data, error });
  }
  if (type === 'delete') {
    let user = null;
    if (users.data !== null)
      user = users.data.find((user: User) => {
        return user.email === email;
      });
    let del;
    if (user) {
      del = supabaseService.auth.api.deleteUser(user.id);
    }
    const profileDel = await supabaseService
      .from('profile')
      .delete()
      .match({ id: user?.id || id });
    return res.json({ del, profileDel });
  }
}
