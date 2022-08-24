import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { ProfileController } from '@api/controllers/profile/ProfileController';
import { NextRequestWithRequiredUser, NextRequestWithUser } from '@src/api/types';
import {
  appendUserToRequest,
  authenticateHandler,
  devLogger,
  handlerDefaults,
  methodNotAllowed,
  validate,
} from '@src/api/router';
import { updateProfileValidator } from '@api/controllers/profile/profile-validation';
import prisma from '@src/lib/prisma';
import supabaseService from '@src/lib/initSupabaseServer';
const profileController = new ProfileController(prisma, supabaseService);

const router = createRouter<NextRequestWithUser | NextRequestWithRequiredUser, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(devLogger)
  .use(expressWrapper(cors()))
  .put(authenticateHandler, validate(updateProfileValidator), profileController.updateProfile)
  .post(profileController.addMetadata)
  .delete(authenticateHandler, profileController.removeUser)
  .all(methodNotAllowed)
  .handler(handlerDefaults);
