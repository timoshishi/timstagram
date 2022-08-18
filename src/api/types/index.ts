import type { NextApiRequest, NextApiResponse } from 'next';
import { SupaUser } from 'types/index';
import { NextFunction } from 'express';
export interface NextRequestWithUser extends NextApiRequest {
  user?: SupaUser | null;
}

export interface NextRequestWithRequiredUser extends NextApiRequest {
  user: SupaUser;
}

export type NextMiddlewareWithUser = (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => void;
