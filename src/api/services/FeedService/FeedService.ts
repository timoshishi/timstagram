import { PrismaClient } from '@prisma/client';
import { postSelectObj, activePostQueryObj } from '../../utils/query-objects';
import { Post } from 'types/post.types';
import type { PostQueryResponse } from '../types';
import { PostService } from '../PostService';

export class FeedService {
  constructor(private prisma: PrismaClient, private postService: PostService) {}

  getUserLikesFeed = async ({
    userId,
    page,
    limit,
    sort,
  }: {
    userId: string;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<Post[]> => {
    const posts: PostQueryResponse[] = await this.prisma.post.findMany({
      where: {
        userId,
        AND: {
          postLikes: {
            every: {
              userId,
            },
          },
        },
      },
      select: postSelectObj,
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
      orderBy: sort ? { [sort]: 'desc' } : undefined,
    });
    return this.postService.formatPostResponseObjects(posts);
  };
  getUserPosts = async ({
    userId,
    page,
    limit,
    sort,
  }: {
    userId: string;
    page?: number;
    limit?: number;
    sort?: string;
  }): Promise<Post[]> => {
    const posts: PostQueryResponse[] = await this.prisma.post.findMany({
      where: {
        userId,
        AND: activePostQueryObj,
      },
      select: postSelectObj,
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
      orderBy: sort ? { [sort]: 'desc' } : undefined,
    });
    return this.postService.formatPostResponseObjects(posts);
  };
}
