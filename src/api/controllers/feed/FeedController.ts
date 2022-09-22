import { PrismaClient } from '@prisma/client';
import { NextRequestWithUser } from '../../types';
import { NextApiResponse } from 'next';
import { FeedService } from '../../services/FeedService';

export class FeedController {
  constructor(private prisma: PrismaClient, private feedService: FeedService) {}

  getFeed = async (req: NextRequestWithUser, res: NextApiResponse) => {
    try {
      const { page, view, limit } = req.query;
      const { user } = req;
      const feed = await this.feedService.getPopular({
        page: Number(page),
        limit: Number(limit),
        userId: user?.id,
      });
      return res.status(200).json({
        data: feed,
        total: 0,
        page: parseInt(page as string),
      });
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };
}
