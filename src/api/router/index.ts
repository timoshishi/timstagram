import { NextRequestWithUser } from '../types';
import { NextApiRequest, NextApiResponse } from 'next';
import { Handler, NextFunction } from 'express';
import { getUser } from '@supabase/auth-helpers-nextjs';
import { HandlerOptions } from 'next-connect';
import { HandleRequestOptions } from 'msw';

export const appendUserToRequest = async (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => {
  const { user, accessToken, error } = await getUser({ req, res });
  req.user = user;
  await next();
};

export const authenticateHandler = async (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'not authenticated',
    });
  }
  return next();
};
