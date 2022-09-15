import { Profile } from '@prisma/client';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import axios from '@src/lib/axios';

export type CreateProfileParams = {
  id: string;
  username: string;
};

export async function usernameDoesExist(username: string): Promise<boolean> {
  const result = await supabaseClient.from<Profile>('profiles').select('username').eq('username', username).limit(1);
  return result?.data?.length ? true : false;
}

export function msLeftUntilSubmission(errorMessage: string): number {
  const seconds = errorMessage.match(/\d+/g);
  return parseInt(seconds?.[0] || '0') * 1000;
}

export const insertInitialProfileData = async ({ id, username }: CreateProfileParams) => {
  const { data } = await axios.post('/profile', {
    id,
    username,
  });
  return data;
};
