import { PostQueryResponse } from '@api/types';
import { prismaMock } from '@src/mocks/singleton';
import { Post } from 'types/post';
import { PostService } from '../PostService';
import { FeedService } from './FeedService';

jest.spyOn(console, 'error').mockImplementation(() => {});
jest.spyOn(console, 'info').mockImplementation(() => {});

const formattedPostReturnNoUser: Post = {
  postId: '44cbb560-e09c-4ff6-b4de-fe42c82ad53e',
  postBody: 'hello dolly',
  viewCount: 1,
  commentCount: 0,
  comments: [],
  hasLiked: false,
  isFollowing: false,
  repostCount: 0,
  likeCount: 1,
  likes: [
    {
      userId: '4d916591-2f88-4a8b-b510-617578a2dc1d',
      username: 'test1',
      avatarUrl: 'https://witter-dev.s3.amazonaws.com/c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
      avatarFilename: 'c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
    },
  ],
  tags: [],
  createdAt: '2022-09-12T20:50:17.329Z',
  media: [
    {
      srcSet: {
        sm: 'https://d1s2y0mcv3lwpm.cloudfront.net/fit-in/640x640/filters:upscale()/f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
        md: 'https://d1s2y0mcv3lwpm.cloudfront.net/fit-in/768x768/filters:upscale()/f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
        lg: 'https://d1s2y0mcv3lwpm.cloudfront.net/fit-in/1024x1024/filters:upscale()/f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
      },
      aspectRatio: 1,
      dimensions: {
        width: 1,
        height: 1,
      },
      filename: 'f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
      placeholder: 'image-placeholder',
    },
  ],
  author: {
    username: 'test1',
    bio: 'gC5u2os7ZAX127E3H9Es8',
    avatarUrl: 'https://witter-dev.s3.amazonaws.com/c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
    followerCount: 0,
    followingCount: 0,
    avatarFilename: 'c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
  },
};

const prismaPostQueryResponse: PostQueryResponse = {
  id: '44cbb560-e09c-4ff6-b4de-fe42c82ad53e',
  postBody: 'hello dolly',
  createdAt: new Date('2022-09-12T20:50:17.329Z'),
  viewCount: 1,
  authorId: '4d916591-2f88-4a8b-b510-617578a2dc1d',
  postHash: 'NxGc88',
  comments: [],
  tags: [],
  media: [
    {
      id: '39bfb72c-059c-41a4-86cc-9571ef7fbc34',
      bucket: 'witter-dev',
      filename: 'f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
      placeholder: 'image-placeholder',
      domain: 's3.amazonaws.com',
      height: 1,
      width: 1,
      aspectRatio: 1,
    },
  ],
  postLikes: [
    {
      profile: {
        username: 'test1',
        id: '4d916591-2f88-4a8b-b510-617578a2dc1d',
        avatarUrl: 'https://witter-dev.s3.amazonaws.com/c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
        avatarFilename: 'c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
      },
    },
  ],
  profile: {
    username: 'test1',
    id: '4d916591-2f88-4a8b-b510-617578a2dc1d',
    avatarUrl: 'https://witter-dev.s3.amazonaws.com/c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
    avatarFilename: 'c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
    bio: 'gC5u2os7ZAX127E3H9Es8',
    _count: { followers: 0, following: 0, posts: 1 },
  },
};
const prismaPost = {
  id: '945f8acf-5dbb-4400-98fc-9a3e4fb194ef',
  postBody: 'This is a test post',
  published: true,
  userId: '65472697-7e71-4bf7-8059-5113ddd59bc1',
  userDeleted: false,
  flagged: false,
  deleted: false,
  flagCount: 0,
  viewCount: 1,
  mediaType: 'image/png',
  mediaUrl: 'https://witter-dev.s3.amazonaws.com/3117b291-08af-4b55-b042-4790b2241442.png',
  mediaId: '3117b291-08af-4b55-b042-4790b2241442',
  filename: '3117b291-08af-4b55-b042-4790b2241442.png',
  createdAt: new Date('2022-09-13T21:43:27.097Z'),
  isBotPost: false,
  isShared: false,
  userAvatarUrl: null,
  username: 'test1',
  postHash: 'F62jKB',
};

describe('FeedService', () => {
  let feedService: FeedService;
  let foundPost: any;
  beforeEach(() => {
    feedService = new FeedService(prismaMock, new PostService(prismaMock));
    foundPost = { ...prismaPostQueryResponse };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getPopular', () => {
    it('should return an array of post objects with the expected properties', async () => {
      prismaMock.post.findMany.mockResolvedValue([foundPost]);

      const result = await feedService.getPopular({
        page: 1,
        limit: 10,
      });

      expect(result).not.toBeNull();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(formattedPostReturnNoUser);
    });
  });
});
