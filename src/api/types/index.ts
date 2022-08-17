import type { NextApiRequest } from 'next';
import { SupaUser } from 'types/index';

export interface NextRequestWithUser extends NextApiRequest {
  user: SupaUser | null;
}
