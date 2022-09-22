import { Post, PostResponse } from 'types/post';
import { randomIntInRange } from '@common/utils';
import { FeedService } from './services/FeedService';
import prisma from '@src/lib/prisma';
import { PostService } from './services/PostService';

const feedService = new FeedService(prisma, new PostService(prisma));

const getFeed = async (limit = 15, page = 1): Promise<PostResponse> => {
  const posts: Post[] = await feedService.getPopular({ limit, page });
  return Promise.resolve({
    data: posts,
    total: randomIntInRange(100, 10000),
    page: page,
  }) as Promise<PostResponse>;
};
export default getFeed;
