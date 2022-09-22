import { PrismaClient } from '@prisma/client';
import { postSelectObj, activePostQueryObj } from '../../utils/query-objects';
import { Post } from 'types/post';
import type { PostQueryResponse } from '../../types';
import { PostService } from '../PostService';
import { Optional } from 'types/index';
interface GetFeedParams {
  page?: number;
  limit?: number;
  sort?: string;
  userId?: string;
}

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
        authorId: userId,
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
        authorId: userId,
        AND: activePostQueryObj,
      },
      select: postSelectObj,
      skip: page && limit ? (page - 1) * limit : undefined,
      take: limit,
      orderBy: sort ? { [sort]: 'desc' } : undefined,
    });
    return this.postService.formatPostResponseObjects(posts);
  };

  getPopular = async ({ page, limit, sort, userId }: Optional<GetFeedParams, 'userId'>): Promise<Post[]> => {
    try {
      const posts: PostQueryResponse[] = await this.prisma.post.findMany({
        where: activePostQueryObj,
        select: postSelectObj,
        skip: page && limit ? (page - 1) * limit : undefined,
        take: limit,
        orderBy: { createdAt: 'desc' },
      });

      const formattedPosts = this.postService.formatPostResponseObjects(posts);
      return formattedPosts;
    } catch (error) {
      console.error(error);
      throw new Error('Error getting popular feed');
    }
  };
}
