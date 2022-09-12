import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { PostController } from '@api/controllers/post/PostController';
import { NextRequestWithRequiredUser, NextRequestWithUser } from '@src/api/types';
import { devLogger, handlerDefaults, methodNotAllowed } from '@src/api/router';
import prisma from '@src/lib/prisma';
import { PostService } from '@api/services/PostService';

const postService = new PostService(process.env.PHOTO_BUCKET!, prisma);

const postController = new PostController(prisma, postService);

const router = createRouter<NextRequestWithUser | NextRequestWithRequiredUser, NextApiResponse>();

export default router
  .use(devLogger)
  .use(expressWrapper(cors()))
  .get(postController.getPost)
  .all(methodNotAllowed)
  .handler(handlerDefaults);
