import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { uploadMiddleware } from '@api/services/ImageService/handleImageUpload';
import { ProfileController } from '@api/controllers/profile/ProfileController';
import prisma from '@src/lib/prisma';
import { NextRequestWithUserFile } from '@src/api/types';
import {
  appendUserToRequest,
  authenticateHandler,
  devLogger,
  handlerDefaults,
  methodNotAllowed,
} from '@api/utils/router';

import supabaseService from '@src/lib/initSupabaseServer';
const profileController = new ProfileController(prisma, supabaseService);

const router = createRouter<NextRequestWithUserFile, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(devLogger)
  .use(expressWrapper(cors()))
  .put(expressWrapper(<any>uploadMiddleware), authenticateHandler, profileController.updateUserAvatar)
  .all(methodNotAllowed)
  .handler(handlerDefaults);

export const config = {
  api: {
    bodyParser: false,
  },
};
