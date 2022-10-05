import { Post } from 'types/post';
import { Post as PrismaPost } from '@prisma/client';

export const post: Post = {
  postId: '0b02597f-ab9c-453f-afde-d8eea8f86956',
  postBody: 'this is a test post',
  viewCount: 1,
  commentCount: 0,
  comments: [],
  hasLiked: true,
  isFollowing: false,
  repostCount: 0,
  likeCount: 4,
  likes: [
    {
      userId: 'a4c8f3bc-0548-4175-8af1-0da66e4460f3',
      username: 'testuser6810',
      avatarUrl: '',
      avatarFilename: null,
    },
    {
      userId: 'e4a44a59-cda9-4195-84f1-0ae759389039',
      username: 'testuser3925',
      avatarUrl: '',
      avatarFilename: null,
    },
    {
      userId: '26b7b836-3427-4686-95da-cd3ec4b7fbd7',
      username: 'mrman',
      avatarUrl: 'https://witter-dev.s3.amazonaws.com/e719921c-023f-43e0-b9d2-92dd55af12e2.png',
      avatarFilename: 'e719921c-023f-43e0-b9d2-92dd55af12e2.png',
    },
    {
      userId: '57e8436f-2d46-4434-8b66-cefcb717b813',
      username: 'test1',
      avatarUrl: 'https://witter-dev.s3.amazonaws.com/6b87b0e2-8b90-4e5c-bcb2-53d3aa7c14f5.png',
      avatarFilename: '6b87b0e2-8b90-4e5c-bcb2-53d3aa7c14f5.png',
    },
  ],
  media: [
    {
      aspectRatio: 1,
      dimensions: {
        width: 399,
        height: 399,
      },
      srcSet: {
        sm: 'https://d1s2y0mcv3lwpm.cloudfront.net/fit-in/640x640/filters:upscale()/bd7541e3-703b-430f-8401-0bd1c5a3f97e.png',
        md: 'https://d1s2y0mcv3lwpm.cloudfront.net/fit-in/768x768/filters:upscale()/bd7541e3-703b-430f-8401-0bd1c5a3f97e.png',
        lg: 'https://d1s2y0mcv3lwpm.cloudfront.net/fit-in/1024x1024/filters:upscale()/bd7541e3-703b-430f-8401-0bd1c5a3f97e.png',
      },
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVQImQE0AMv/APj4+/7///f4/9ve5QDJycrUzMT/8ub2690AsZh1rJeArJuIvaePAC0lHSwpKRcaIQAAB/AEHlIC0AbtAAAAAElFTkSuQmCC',
      filename: 'bd7541e3-703b-430f-8401-0bd1c5a3f97e.png',
    },
  ],
  tags: [],
  createdAt: '2022-10-05T16:52:18.804Z',
  author: {
    username: 'testuser1576',
    bio: '',
    avatarUrl: '',
    avatarFilename: null,
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
