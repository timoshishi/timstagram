export const postSelectObj = {
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

export const activePostQueryObj = {
  deleted: false,
  userDeleted: false,
  published: true,
  flagged: false,
};
