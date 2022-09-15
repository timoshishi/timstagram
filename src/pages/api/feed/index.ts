import getFeed from '@src/api/getFeed';
import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { NextRequestWithUser, NextApiResponse } from '@src/api/types';
import { appendUserToRequest, devLogger, handlerDefaults, methodNotAllowed } from '@api/utils/router';
import prisma from '@src/lib/prisma';
import { uploadMiddleware } from '@api/services/ImageService/handleImageUpload';
import { PostService } from '@api/services/PostService';
import { ImageService } from '@api/services/ImageService';
import { s3Client } from '@src/lib/s3Client';
import { FeedController } from '@api/controllers/feed/FeedController';

const feedController = new FeedController(
  prisma,
  new PostService(prisma, new ImageService(process.env.PHOTO_BUCKET!, s3Client))
);
const router = createRouter<NextRequestWithUser, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(devLogger)
  .use(expressWrapper(cors()))
  .get(feedController.getFeed)
  .all(methodNotAllowed)
  .handler(handlerDefaults);
