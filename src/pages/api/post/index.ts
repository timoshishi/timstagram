import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { PostController } from '@api/controllers/post/PostController';
import { NextRequestWithUserFile } from '@src/api/types';
import {
  appendUserToRequest,
  authenticateHandler,
  devLogger,
  handlerDefaults,
  methodNotAllowed,
} from '@api/utils/router';
import prisma from '@src/lib/prisma';
import { uploadMiddleware } from '@api/services/ImageService/handleImageUpload';
import { PostService } from '@api/services/PostService';

const postService = new PostService(prisma);
const postController = new PostController(postService);

const router = createRouter<NextRequestWithUserFile, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(devLogger)
  .use(expressWrapper(cors()))
  .post(expressWrapper(<any>uploadMiddleware), authenticateHandler, postController.createPost)
  .all(methodNotAllowed)
  .handler(handlerDefaults);

export const config = {
  api: {
    bodyParser: false,
  },
};
