// https://github.com/hoangvvo/next-connect
import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { uploadMiddleware } from '@src/api/handleImageUpload';
import { ProfileController } from '@api/controllers/profile/ProfileController';
import prisma from '@src/lib/prisma';
import { NextRequestWithUser } from '@src/api/types';
import { appendUserToRequest, authenticateHandler, handlerDefaults, methodNotAllowed } from '@src/api/router';
import supabaseService from '@src/lib/initSupabaseServer';
const profileController = new ProfileController(prisma, supabaseService);

export interface NextRequestWithUserFile extends NextRequestWithUser {
  file: Express.Multer.File;
}

const router = createRouter<NextRequestWithUserFile, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(expressWrapper(cors()))
  .put(expressWrapper(<any>uploadMiddleware), authenticateHandler, profileController.updateUserAvatar)
  .all(methodNotAllowed)
  .handler(handlerDefaults);

export const config = {
  api: {
    bodyParser: false,
  },
};
