import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { ProfileController } from '@api/controllers/profile/ProfileController';
import { NextRequestWithUser } from '@src/api/types';
import { appendUserToRequest, authenticateHandler, handlerDefaults, methodNotAllowed, validate } from '@src/api/router';
import { updateProfileValidator } from '@api/controllers/profile/profile-validation';
import prisma from '@src/lib/prisma';
import supabaseService from '@src/lib/initSupabaseServer';
const profileController = new ProfileController(prisma, supabaseService);

const router = createRouter<NextRequestWithUser, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(expressWrapper(cors()))
  .use(async (req, res, next) => {
    const start = Date.now();
    await next();
    const end = Date.now();
    console.log(`${req.method} ${req.url} ${res.statusCode} ${end - start}ms`);
  })
  .put(authenticateHandler, validate(updateProfileValidator), profileController.updateProfile)
  .post(profileController.addMetadata)
  .delete(authenticateHandler, profileController.removeUser)
  .all(methodNotAllowed)
  .handler(handlerDefaults);
