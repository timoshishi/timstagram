import { NextApiRequest, NextApiResponse } from 'next';
import { createMiddlewareDecorator, HttpException } from '@storyofams/next-api-decorators';
import { NextFunction } from '@storyofams/next-api-decorators';
import { getUser } from '@supabase/auth-helpers-nextjs';
import { ProfileAPI } from '../../api/profile/ProfileAPI';
import prisma from '@src/lib/prisma';
import { ValidationOptions, ValidateIf } from 'class-validator';

const profileHandler = new ProfileAPI(prisma);

export const AttachUserData = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    try {
      const { user, error } = await getUser({ req, res });
      req.body = req.body || {};
      req.body.userData = {
        profile: null,
        user: null,
      };
      if (user) {
        req.body.userData.user = user;
        const profile = await profileHandler.getProfile(user.id);
        req.body.userData.profile = profile;
      }
    } catch (error) {
      console.error('ERRROR', error);
    }
    next();
  }
);

export function errorHandler(error: unknown, req: NextApiRequest, res: NextApiResponse) {
  console.error(error);
  if (error instanceof HttpException) {
    const { stack, ...rest } = error;
    res.status(error.statusCode).json(rest);
  } else {
    res.status(500).json({ statusCode: 500, message: error });
  }
}

export function IsNullable(validationOptions?: ValidationOptions) {
  return ValidateIf((_object, value) => value !== null, validationOptions);
}

export function IsNull(validationOptions?: ValidationOptions) {
  return ValidateIf((_object, value) => value === null, validationOptions);
}
