import { PrismaClient, Prisma, Post as PrismaPost } from '@prisma/client';
import { ImageService } from './ImageService';
import { ImageProperties } from '../handleImageUpload';
import { customNano } from '../../lib/customNano';
import { randomUUID } from 'crypto';
import { constructPostResponseObject, postSelectObj, activePostQueryObj } from '../getPost';
import { Post } from 'types/post.types';
import { PostHash as PrismaPostHash } from '@prisma/client';
import { SupaUser } from 'types/index';

type GetPostParams = {
  postHash?: string;
  postId?: string;
  userId?: string;
};

type PostQueryResponse = Prisma.PromiseReturnType<PostService['getSinglePost']>;
export class PostService {
  constructor(private prisma: PrismaClient, public imageService: ImageService) {}

  getPostByHashOrId = async ({ postHash, postId, userId }: GetPostParams): Promise<Post | null> => {
    try {
      if (!postHash && !postId) {
        console.error('Must provide either postHash or postId');
        return null;
      }
      const post: PostQueryResponse = await this.getSinglePost({ postHash, postId });
      if (!post) {
        console.info('post not found');
        return null;
      }
      const { hasLikedPost, hasFlaggedPost, isFollowingUser } = await this.getPersonalizedUserProperties({
        userId,
        post,
      });
      if (hasFlaggedPost) {
        return null;
      }
      return constructPostResponseObject({ post, hasLikedPost, isFollowingUser, hasFlaggedPost });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  getSinglePost = async ({ postHash, postId }: GetPostParams) => {
    try {
      const foundPost = await this.prisma.post.findFirst({
        where: {
          OR: [
            {
              postHash,
            },
            {
              id: postId,
            },
          ],
          AND: activePostQueryObj,
        },
        select: postSelectObj,
      });
      if (!foundPost) {
        return null;
      }
      return foundPost;
    } catch (error) {
      console.error(error);
    }
  };

  createPostHash = async (): Promise<string | null> => {
    let result: PrismaPostHash | null;
    //TODO: Change this to a get req to the PostHash table that has pre-generated base62 encoded hashes
    for (let retries = 0; retries < 3; retries++) {
      const nano = customNano();
      result = await this.prisma.postHash.findUnique({
        where: {
          postHash: nano,
        },
      });
      if (!result) {
        return nano;
      }
    }
    return null;
  };

  createPost = async ({
    user,
    imageProperties,
    caption,
  }: {
    user: SupaUser;
    imageProperties: ImageProperties;
    caption: string;
  }): Promise<PrismaPost> => {
    try {
      const postHash = await this.createPostHash();

      if (!postHash) {
        throw new Error('Could not create post hash');
      }

      await this.prisma.postHash.create({
        data: {
          postHash,
        },
      });

      const postId = randomUUID();

      const post = await this.prisma.post.create({
        data: {
          id: postId,
          mediaId: imageProperties.id,
          postHash,
          userId: user.id,
          username: user.user_metadata.username,
          mediaType: imageProperties.type,
          postBody: caption,
          mediaUrl: imageProperties.url,
          filename: imageProperties.filename,
        },
      });
      await this.prisma.media.create({
        data: {
          userId: user.id,
          aspectRatio: imageProperties.aspectRatio,
          width: imageProperties.width,
          height: imageProperties.height,
          bucket: imageProperties.bucket,
          filename: imageProperties.filename,
          type: imageProperties.type,
          source: imageProperties.source,
          url: imageProperties.url,
          userMetadata: {} as any,
          size: imageProperties.size,
          kind: 'post',
          hash: imageProperties.hash,
          postId: postId,
        },
      });

      await this.prisma.postLike.create({
        data: {
          postId,
          userId: user.id,
        },
      });

      return post;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getPersonalizedUserProperties = async ({
    userId,
    post,
  }: {
    userId?: string;
    post: PostQueryResponse;
  }): Promise<{ hasLikedPost: boolean; hasFlaggedPost: boolean; isFollowingUser: boolean }> => {
    try {
      if (!post) {
        throw new Error('Post is required');
      }

      if (!userId) {
        Promise.resolve({
          hasLikedPost: false,
          hasFlaggedPost: false,
          isFollowingUser: false,
        });
      }

      const isFollowingUser = !!(await this.prisma.profile.findFirst({
        where: {
          AND: [
            {
              id: userId,
            },
            {
              following: {
                every: {
                  id: post?.userId,
                },
              },
            },
          ],
        },
      }));
      // TODO: this is going to need to be changed to a query that checks if the user has flagged the post in the future
      const hasLikedPost = !!post?.postLikes.find((like) => like.profile.id === userId);

      const hasFlaggedPost = !!(await this.prisma.postFlag.findFirst({
        where: {
          AND: [
            {
              postId: post?.id,
            },
            {
              flaggedByUserId: userId,
            },
          ],
        },
      }));

      return { hasLikedPost, hasFlaggedPost, isFollowingUser };
    } catch (error) {
      console.error(error);
      throw new Error('Error getting user properties');
    }
  };
}
