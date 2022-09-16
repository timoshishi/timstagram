export const postSelectObj = {
  id: true,
  postBody: true,
  createdAt: true,
  viewCount: true,
  authorId: true,
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
      domain: true,
      filename: true,
      height: true,
      width: true,
      aspectRatio: true,
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

export const activePostQueryObj = {
  deleted: false,
  published: true,
  flagged: false,
};
