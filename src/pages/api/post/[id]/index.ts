import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { PostController } from '@api/controllers/post/PostController';
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
const postController = new PostController(prisma);

const router = createRouter<NextRequestWithUser | NextRequestWithRequiredUser, NextApiResponse>();

export default router
  .use(devLogger)
  .use(expressWrapper(cors()))
  .get(postController.getPost)
  .all(methodNotAllowed)
  .handler(handlerDefaults);
