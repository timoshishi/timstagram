import { NextRequestWithRequiredUser, NextRequestWithUser } from '../types';
import { NextApiResponse } from 'next';
import { NextFunction } from 'express';
import { getUser } from '@supabase/auth-helpers-nextjs';
import { ValidationChain, validationResult } from 'express-validator';
import morgan from 'morgan';

export const appendUserToRequest = async (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => {
  const { user, accessToken, error } = await getUser({ req, res });
  if (error) {
    console.error(error);
  }
  req.user = user;
  await next();
};
export type NextUserMiddleware = (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => void;

export const authenticateHandler = async (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      error: 'not authenticated',
    });
  }
  req = req as NextRequestWithRequiredUser;
  return next();
};

export type NextRequiredUserMiddleware = (
  req: NextRequestWithRequiredUser,
  res: NextApiResponse,
  next: NextFunction
) => void;

export const checkUser: NextUserMiddleware = (req, res, next) => {
  if (req.user === null) {
    return res.status(401).json({
      error: 'not authenticated',
    });
  }
  return next();
};

export const validate = (validations: ValidationChain[]) => {
  return async (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorArray = errors.array();
      console.error({ errorArray }, req.url, req.method);
      return res.status(400).end();
    }
    req = req as NextRequestWithRequiredUser;
    next();
  };
};

export const methodNotAllowed = (req: NextRequestWithUser, res: NextApiResponse) => {
  res.status(405).json({
    error: 'Method not allowed',
  });
};

export const handlerDefaults = {
  onError: (err: any, req: any, res: any) => {
    console.error(err);
    res.status(500).json({ res: 'Something broke!', err: err });
  },
  onNoMatch: (_: any, res: any) => {
    res.status(404).json({ error: 'Page is not found' });
  },
};

export const devLogger = (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => {
  if (process.env.ENVIRONMENT === 'local') {
    morgan('dev')(req, res, next);
  } else {
    next();
  }
};
