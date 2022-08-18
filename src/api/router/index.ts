import { NextRequestWithUser } from '../types';
import { NextApiResponse } from 'next';
import { NextFunction } from 'express';
import { getUser } from '@supabase/auth-helpers-nextjs';
import { ValidationChain, validationResult } from 'express-validator';

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

export type NextUserMiddleware = (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => void;

// export const checkValidation = (req: NextRequestWithUser, res: NextApiResponse, next: any): void => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const errorArray = errors.array();
//     console.error(errorArray, req.url, req.method);
//     return res.status(400).json({ error: 'Bad request' });
//   }
//   next();
// };

export const validate = (validations: ValidationChain[]) => {
  return async (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorArray = errors.array();
      console.error({ errorArray }, req.url, req.method);
      return res.status(400).end();
    }
    next();
  };
};
