import { PrismaClient, Post as PrismaPost } from '@prisma/client';
import { customNano } from '../../../lib/customNano';
import { randomUUID } from 'crypto';
import { postSelectObj, activePostQueryObj } from '../../utils/query-objects';
import { Post } from 'types/post';
import { PostHash as PrismaPostHash } from '@prisma/client';
import { SupaUser } from 'types/index';
import type { PostQueryResponse, ImageProperties } from '../../types';
import { constructSrcSet } from '../ImageService/handleImageUpload';
import { DEFAULT_IMAGE_PLACEHOLDER } from '../../../common/constants';
import { Environment } from 'types/environment';

type GetPostParams = {
  postHash?: string;
  postId?: string;
  userId?: string;
};

export class PostService {
  constructor(private prisma: PrismaClient) {}

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
      return this.constructPostResponseObject({ post, hasLikedPost, isFollowingUser, hasFlaggedPost });
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
          postHash,
          authorId: user.id,
          postBody: caption,
          filename: imageProperties.filename,
          media: {
            create: [
              {
                user: {
                  connect: {
                    id: user.id,
                  },
                },
                aspectRatio: imageProperties.aspectRatio,
                width: imageProperties.width,
                height: imageProperties.height,
                bucket: imageProperties.bucket,
                filename: imageProperties.filename,
                type: imageProperties.type,
                source: imageProperties.source,
                domain: imageProperties.domain,
                userMetadata: {} as any,
                size: imageProperties.size,
                kind: 'post',
                hash: imageProperties.hash,
                placeholder: imageProperties.placeholder,
              },
            ],
          },
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
                  id: post?.authorId,
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

  constructPostResponseObject = ({
    post,
    hasLikedPost,
    isFollowingUser,
    hasFlaggedPost,
  }: {
    post: PostQueryResponse;
    hasLikedPost: boolean;
    isFollowingUser: boolean;
    hasFlaggedPost: boolean;
  }): Post | null => {
    if (!post) {
      throw new Error('Post is required');
    }
    if (hasFlaggedPost) {
      return null;
    }
    const comments = post.comments.map((comment) => ({
      userId: comment.id,
      username: comment.profile.username,
      avatarUrl: comment.profile.avatarUrl,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
    }));
    const srcSet = constructSrcSet({
      imageStackDomain: process.env.IMAGE_STACK_DOMAIN as Environment['IMAGE_STACK_DOMAIN'],
      imageStackId: process.env.IMAGE_STACK_ID as Environment['IMAGE_STACK_ID'],
      filename: post.media[0].filename,
      aspectRatio: post.media[0].aspectRatio,
    });

    const responseBody: Post = {
      postId: post.id,
      postBody: post.postBody,
      viewCount: post.viewCount,
      commentCount: post.comments.length,
      comments: comments,
      hasLiked: hasLikedPost,
      isFollowing: !!isFollowingUser,
      repostCount: 0,
      likeCount: post.postLikes.length,
      likes: post.postLikes.map((like) => ({
        userId: like.profile.id,
        username: like.profile.username,
        avatarUrl: like.profile.avatarUrl,
      })),
      media: post.media.map((media) => ({
        aspectRatio: media.aspectRatio,
        dimensions: {
          width: media.width,
          height: media.height,
        },
        srcSet,
        placeholder: media.placeholder || DEFAULT_IMAGE_PLACEHOLDER,
        filename: media.filename,
      })),
      tags: post.tags,
      createdAt: post.createdAt.toISOString(),
      author: {
        username: post.profile.username,
        bio: post.profile.bio,
        avatarUrl: post.profile.avatarUrl,
        followerCount: post.profile._count.followers,
        followingCount: post.profile._count.following,
      },
    };
    return responseBody;
  };

  formatPostResponseObjects = (posts: PostQueryResponse[], userId?: string): Post[] => {
    const responseBody: Post[] = posts.reduce((posts: Post[], post: PostQueryResponse) => {
      const body = this.constructPostResponseObject({
        post,
        hasLikedPost: post?.postLikes.find((like) => like.profile.id === userId) ? true : false, //TODO: later more feed customization
        isFollowingUser: false,
        hasFlaggedPost: false,
      });
      if (body) {
        posts.push(body);
      }
      return posts;
    }, []);
    return responseBody;
  };
}
