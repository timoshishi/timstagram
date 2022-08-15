import type { Profile } from '@prisma/client';
import type { User } from '@supabase/auth-helpers-react';

export interface SupaUser extends User {
  user_metadata: {
    username: string;
    avatar_url: string;
  };
}
