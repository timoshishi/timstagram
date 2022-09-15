import { createRouter, expressWrapper } from 'next-connect';
import cors from 'cors';
import { NextRequestWithUser, NextApiResponse } from '@src/api/types';
import { appendUserToRequest, devLogger, handlerDefaults, methodNotAllowed } from '@api/utils/router';
import prisma from '@src/lib/prisma';
import { PostService } from '@api/services/PostService';
import { FeedController } from '@api/controllers/feed/FeedController';
import { FeedService } from '@api/services/FeedService';

const postService = new PostService(prisma);
const feedController = new FeedController(prisma, new FeedService(prisma, postService));

const router = createRouter<NextRequestWithUser, NextApiResponse>();

export default router
  .use(appendUserToRequest)
  .use(devLogger)
  .use(expressWrapper(cors()))
  .get(feedController.getFeed)
  .all(methodNotAllowed)
  .handler(handlerDefaults);
