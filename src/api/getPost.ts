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
  if (!postHash && !postId) {
    throw new Error('Must provide either postHash or postId');
  }

  const post: PostQueryResponse = await getSinglePost({ postHash, postId, prisma });
  if (!post || !post.published || post.flagged || post.userDeleted || post.deleted) {
    return null;
  }

  if (!post || !post.published || post.flagged || post.userDeleted || post.deleted) {
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
    return prisma.post.findFirst({
      where: {
        OR: [
          {
            postHash,
          },
          {
            id: postId,
          },
        ],
      },
      select: {
        id: true,
        published: true,
        postBody: true,
        createdAt: true,
        viewCount: true,
        mediaUrl: true,
        userAvatarUrl: true,
        username: true,
        userId: true,
        postHash: true,
        flagged: true,
        userDeleted: true,
        deleted: true,
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
          },
          include: {
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
          },
          include: {
            _count: {
              select: {
                followers: true,
                following: true,
                posts: true,
              },
            },
          },
        },
      },
    });
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
