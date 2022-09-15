import { PrismaClient } from '@prisma/client';
import { NextRequestWithUser } from '../../types';
import { NextApiResponse } from 'next';
import { PostService } from '../../services/PostService';
import getFeed from '@api/getFeed';

export class FeedController {
  constructor(private prisma: PrismaClient, private postService: PostService) {
    this.prisma = prisma;
    this.postService = postService;
  }

  getFeed = async (req: NextRequestWithUser, res: NextApiResponse) => {
    try {
      console.log('GETTING FEED');
      const { page, view, limit } = req.query;
      const { user } = req;

      console.log({ page, view, limit });

      return res.status(200).json(await getFeed());
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };
}
