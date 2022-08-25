import type { NextApiResponse } from 'next';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { PostController } from '@api/controllers/post/PostController';
import { NextRequestWithRequiredUser, NextRequestWithUser, NextRequestWithUserFile } from '@src/api/types';
import {
  appendUserToRequest,
  authenticateHandler,
  devLogger,
  handlerDefaults,
  methodNotAllowed,
  validate,
} from '@src/api/router';
import { createPostValidator } from '@api/controllers/post/post-validation';
import prisma from '@src/lib/prisma';
import { uploadMiddleware } from '@api/handleImageUpload';

const postController = new PostController(prisma);

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
