import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { PostController } from '@api/controllers/post/PostController';
import { NextRequestWithRequiredUser, NextRequestWithUser } from '@src/api/types';
import { devLogger, handlerDefaults, methodNotAllowed } from '@src/api/router';
import prisma from '@src/lib/prisma';
import { PostService } from '@api/services/PostService';
import { imageService } from '@api/services/ImageService';

const postService = new PostService(prisma, imageService);

const postController = new PostController(prisma, postService);

const router = createRouter<NextRequestWithUser | NextRequestWithRequiredUser, NextApiResponse>();

export default router
  .use(devLogger)
  .use(expressWrapper(cors()))
  .get(postController.getPost)
  .all(methodNotAllowed)
  .handler(handlerDefaults);
