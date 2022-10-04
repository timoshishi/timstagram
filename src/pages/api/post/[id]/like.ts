import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { PostController } from '@api/controllers/post/PostController';
import { NextRequestWithRequiredUser, NextRequestWithUser } from '@src/api/types';
import { appendUserToRequest, devLogger, handlerDefaults, methodNotAllowed } from '@src/api/utils/router';
import prisma from '@src/lib/prisma';
import { PostService } from '@api/services/PostService';

const postService = new PostService(prisma);
const postController = new PostController(postService);

const router = createRouter<NextRequestWithUser | NextRequestWithRequiredUser, NextApiResponse>();

export default router
  .use(devLogger)
  .use(appendUserToRequest)
  .use(expressWrapper(cors()))
  .put(postController.toggleLike)
  .all(methodNotAllowed)
  .handler(handlerDefaults);
