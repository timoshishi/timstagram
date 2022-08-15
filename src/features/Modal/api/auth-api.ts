import { Profile } from '@prisma/client';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

export async function usernameDoesExist(username: string): Promise<boolean> {
  const result = await supabaseClient.from<Profile>('profile').select('username').eq('username', username).limit(1);
  return result?.data?.length ? true : false;
}

export function msLeftUntilSubmission(errorMessage: string): number {
  const seconds = errorMessage.match(/\d+/g);
  return parseInt(seconds?.[0] || '0') * 1000;
}
