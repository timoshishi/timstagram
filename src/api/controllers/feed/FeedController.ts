import { PrismaClient } from '@prisma/client';
import { NextRequestWithUser } from '../../types';
import { NextApiResponse } from 'next';
import { FeedService } from '../../services/FeedService';
import getFeed from '@api/getFeed';
import { Controller } from '../Controller';
import { Post } from 'types/post.types';

export class FeedController extends Controller {
  constructor(private prisma: PrismaClient, private feedService: FeedService) {
    super();
  }

  getFeed = async (req: NextRequestWithUser, res: NextApiResponse) => {
    try {
      const { page, view, limit } = req.query;
      const { user } = req;
      const feed = await this.feedService.getPopular({
        page: Number(page),
        limit: Number(limit),
        userId: user?.id,
      });
      return res.status(200).json(this.formatSuccessResponse<Post[]>({ data: feed }));
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };
}
