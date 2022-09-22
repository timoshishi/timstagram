import type { User } from '@supabase/auth-helpers-react';
import type { ValidationChain } from 'express-validator';
export interface SupaUser extends User {
  user_metadata: {
    username: string;
    avatarUrl: string;
    bio: string;
  };
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type Tuple<TItem, TLength extends number> = [TItem, ...TItem[]] & { length: TLength };

export type ValidationTuple = [ValidationChain, ...ValidationChain[]];
