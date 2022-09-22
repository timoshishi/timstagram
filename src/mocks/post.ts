import { Post } from 'types/post';
import { Post as PrismaPost } from '@prisma/client';
export const post: Post = {
  postId: '8a184667-6ea8-4ac5-83b9-b22ab633faac',
  postBody: 'this is a #post that i made @myman timmy',
  viewCount: 0,
  commentCount: 0,
  comments: [],
  hasLiked: false,
  isFollowing: true,
  repostCount: 0,
  likeCount: 1,
  likes: [
    {
      userId: '0ba309d0-4a7a-4251-bbaf-e209d84b3d43',
      username: 'test1',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1703?v=4',
    },
  ],
  media: [
    {
      aspectRatio: 1,
      dimensions: {
        width: 400,
        height: 400,
      },
      fallbackImageUrl: 'https://witter-dev.s3.amazonaws.com/58d31e3a-af92-4830-850d-97859780ba88.png',
      filename: '58d31e3a-af92-4830-850d-97859780ba88.png',
      placeholder: 'aasdfewafewafwef',
    },
  ],
  tags: [],
  createdAt: '2022-09-03T18:55:10.294Z',
  author: {
    username: 'test1',
    bio: 'Et maxime facilis temporibus nihil aut non alias repudiandae autem.',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/1703?v=4',
    followerCount: 0,
    followingCount: 0,
  },
};

export const prismaPost: PrismaPost = {
  id: '945f8acf-5dbb-4400-98fc-9a3e4fb194ef',
  postBody: 'This is a test post',
  published: true,
  authorId: '65472697-7e71-4bf7-8059-5113ddd59bc1',
  flagged: false,
  deleted: false,
  flagCount: 0,
  viewCount: 1,
  filename: '3117b291-08af-4b55-b042-4790b2241442.png',
  createdAt: new Date('2022-09-13T21:43:27.097Z'),
  postHash: 'F62jKB',
};
