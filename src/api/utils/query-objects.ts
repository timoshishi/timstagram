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
          avatarFilename: true,
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
      bucket: true,
      domain: true,
      filename: true,
      height: true,
      width: true,
      aspectRatio: true,
      placeholder: true,
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
          avatarFilename: true,
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
      avatarFilename: true,
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
