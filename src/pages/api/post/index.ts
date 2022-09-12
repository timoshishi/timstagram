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
} from '@src/api/router';
import prisma from '@src/lib/prisma';
import { uploadMiddleware } from '@api/handleImageUpload';
import { PostService } from '@api/services/PostService';

const postService = new PostService(process.env.PHOTO_BUCKET!, prisma);
const postController = new PostController(prisma, postService);

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
