import { Post } from 'types/post.types';
import { PrismaClient, Prisma } from '@prisma/client';

type GetPostParams = {
  postHash?: string;
  postId?: string;
  prisma: PrismaClient;
  userId?: string;
};

type PostQueryResponse = Prisma.PromiseReturnType<typeof getSinglePost>;

export const getPostByHashOrId = async ({ postHash, postId, prisma, userId }: GetPostParams): Promise<Post | null> => {
  try {
    if (!postHash && !postId) {
      console.error('Must provide either postHash or postId');
    }
    const post: PostQueryResponse = await getSinglePost({ postHash, postId, prisma });
    if (!post) {
      console.log('post not found');
      return null;
    }
    const { hasLikedPost, hasFlaggedPost, isFollowingUser } = await getPersonalizedUserProperties({
      userId,
      post,
      prisma,
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

export const getUserPosts = async ({
  userId,
  prisma,
  page,
  limit,
  sort,
}: {
  userId: string;
  prisma: PrismaClient;
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<Post[]> => {
  const posts: PostQueryResponse[] = await prisma.post.findMany({
    where: {
      userId,
      AND: activePostQueryObj,
    },
    select: postSelectObj,
    skip: page && limit ? (page - 1) * limit : undefined,
    take: limit,
    orderBy: sort ? { [sort]: 'desc' } : undefined,
  });
  return createResponseObjectArray(posts);
};

export const getUserLikedPosts = async ({
  userId,
  prisma,
  page,
  limit,
  sort,
}: {
  userId: string;
  prisma: PrismaClient;
  page?: number;
  limit?: number;
  sort?: string;
}): Promise<Post[]> => {
  const posts: PostQueryResponse[] = await prisma.post.findMany({
    where: {
      userId,
      AND: {
        postLikes: {
          some: {
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
  return createResponseObjectArray(posts);
};

const createResponseObjectArray = (posts: PostQueryResponse[]): Post[] => {
  const responseBody: Post[] = posts.reduce((posts: Post[], post: PostQueryResponse) => {
    const body = constructPostResponseObject({
      post,
      hasLikedPost: false,
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

const constructPostResponseObject = ({
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
    imageUrl: post.media[0]?.url,
    tags: post.tags,
    createdAt: post.createdAt.toISOString(),
    poster: {
      username: post.profile.username,
      bio: post.profile.bio,
      avatarUrl: post.profile.avatarUrl,
      followerCount: post.profile._count.followers,
      followingCount: post.profile._count.following,
    },
  };
  return responseBody;
};

const getSinglePost = async ({ postHash, postId, prisma }: GetPostParams) => {
  try {
    const foundPost = await prisma.post.findFirst({
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
    console.log({ foundPost });
    return foundPost;
  } catch (error) {
    console.error(error);
  }
};

const getPersonalizedUserProperties = async ({
  userId,
  prisma,
  post,
}: {
  userId?: string;
  prisma: PrismaClient;
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

    const isFollowingUser = !!(await prisma.profile.findFirst({
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

    const hasLikedPost = !!post?.postLikes.find((like) => like.profile.id === userId);

    const hasFlaggedPost = !!(await prisma.postFlag.findFirst({
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

const postSelectObj = {
  id: true,
  postBody: true,
  createdAt: true,
  viewCount: true,
  mediaUrl: true,
  userAvatarUrl: true,
  username: true,
  userId: true,
  postHash: true,
  comments: {
    select: {
      id: true,
      content: true,
      createdAt: true,
      profile: {
        select: {
          username: true,
          id: true,
          avatarUrl: true,
        },
      },
    },
  },
  tags: {
    select: {
      id: true,
      name: true,
    },
  },
  media: {
    select: {
      id: true,
      url: true,
      bucket: true,
      filename: true,
    },
  },
  postLikes: {
    where: {
      doesLike: true,
    },
    select: {
      profile: {
        select: {
          username: true,
          id: true,
          avatarUrl: true,
        },
      },
    },
  },
  profile: {
    select: {
      username: true,
      id: true,
      avatarUrl: true,
      bio: true,
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true,
        },
      },
    },
  },
};

const activePostQueryObj = {
  deleted: false,
  userDeleted: false,
  published: true,
  flagged: false,
};
