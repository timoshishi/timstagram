import { useUser as useSupabaseUser } from '@supabase/auth-helpers-react';
import type { UserState } from '@supabase/auth-helpers-shared';
import { SupaUser } from 'types/index';

interface SupaUserState extends UserState {
  user: SupaUser | null;
}
type UseUser = () => SupaUserState;

export const useUser = useSupabaseUser as UseUser;
