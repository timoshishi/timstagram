import { prismaMock } from '@src/mocks/singleton';
import { PostService } from '../PostService';
import { FeedService } from './FeedService';

// jest.spyOn(console, 'error').mockImplementation(() => {});

const formattedPostReturn = {
  postId: '44cbb560-e09c-4ff6-b4de-fe42c82ad53e',
  postBody: 'hello dolly',
  viewCount: 1,
  commentCount: 0,
  comments: [],
  hasLiked: true,
  isFollowing: true,
  repostCount: 0,
  likeCount: 1,
  likes: [
    {
      userId: '4d916591-2f88-4a8b-b510-617578a2dc1d',
      username: 'test1',
      avatarUrl: 'https://witter-dev.s3.amazonaws.com/c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
    },
  ],
  imageUrl: 'https://witter-dev.s3.amazonaws.com/f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
  tags: [],
  createdAt: '2022-09-12T20:50:17.329Z',
  poster: {
    username: 'test1',
    bio: 'gC5u2os7ZAX127E3H9Es8',
    avatarUrl: 'https://witter-dev.s3.amazonaws.com/c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
    followerCount: 0,
    followingCount: 0,
  },
};

const formattedPostReturnNoUser = {
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
    },
  ],
  imageUrl: 'https://witter-dev.s3.amazonaws.com/f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
  tags: [],
  createdAt: '2022-09-12T20:50:17.329Z',
  poster: {
    username: 'test1',
    bio: 'gC5u2os7ZAX127E3H9Es8',
    avatarUrl: 'https://witter-dev.s3.amazonaws.com/c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
    followerCount: 0,
    followingCount: 0,
  },
};

const prismaPostQueryResponse = {
  id: '44cbb560-e09c-4ff6-b4de-fe42c82ad53e',
  postBody: 'hello dolly',
  createdAt: new Date('2022-09-12T20:50:17.329Z'),
  viewCount: 1,
  mediaUrl: 'https://witter-dev.s3.amazonaws.com/f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
  userAvatarUrl: null,
  username: 'test1',
  userId: '4d916591-2f88-4a8b-b510-617578a2dc1d',
  postHash: 'NxGc88',
  comments: [],
  tags: [],
  media: [
    {
      id: '39bfb72c-059c-41a4-86cc-9571ef7fbc34',
      url: 'https://witter-dev.s3.amazonaws.com/f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
      bucket: 'witter-dev',
      filename: 'f144dbef-48bf-4bd8-bef4-ec1c3e9601e7.png',
    },
  ],
  postLikes: [
    {
      profile: {
        username: 'test1',
        id: '4d916591-2f88-4a8b-b510-617578a2dc1d',
        avatarUrl: 'https://witter-dev.s3.amazonaws.com/c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
      },
    },
  ],
  profile: {
    username: 'test1',
    id: '4d916591-2f88-4a8b-b510-617578a2dc1d',
    avatarUrl: 'https://witter-dev.s3.amazonaws.com/c650d27a-d84c-4497-ac63-3a93757c9ebf.png',
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
    // let getSinglePostSpy: jest.SpyInstance;
    // let getPersonalizedUserPropertiesSpy: jest.SpyInstance;

    // beforeEach(() => {
    //   getSinglePostSpy = jest.spyOn(postService, 'getSinglePost');
    //   getPersonalizedUserPropertiesSpy = jest.spyOn(postService, 'getPersonalizedUserProperties');
    // });

    it('should return an array of post objects with the expected properties', async () => {
      prismaMock.post.findMany.mockResolvedValue([foundPost]);
      const result = await feedService.getPopular({
        page: 1,
        limit: 10,
        userId: '4d916591-2f88-4a8b-b510-617578a2dc1d',
      });
      expect(result).not.toBeNull();
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(formattedPostReturnNoUser);
    });

    // it('should return null if the getSinglePost does not find a post', async () => {
    //   getSinglePostSpy.mockResolvedValueOnce(null);
    //   const result = await postService.getPostByHashOrId({ postHash: 'test' });
    //   expect(result).toBeNull();
    // });

    // it('should return a full post if everything is found', async () => {
    //   let newPost = foundPost;
    //   newPost.createdAt = new Date(foundPost.createdAt);
    //   getSinglePostSpy.mockResolvedValueOnce(foundPost);

    //   getPersonalizedUserPropertiesSpy.mockResolvedValueOnce({
    //     isFollowingUser: true,
    //     hasLikedPost: true,
    //     hasFlaggedPost: false,
    //   });

    //   const result: Post | null = await postService.getPostByHashOrId({ postHash: 'test' });

    //   expect(result).toEqual(formattedPostReturn);
    // });
  });

  // describe('getSinglePost', () => {
  //   it('should return null if no post is found', async () => {
  //     const result = await postService.getSinglePost({ postHash: 'test' });
  //     expect(result).toBeNull();
  //     const postIdResult = await postService.getSinglePost({ postId: '1' });
  //     expect(postIdResult).toBeNull();
  //   });

  //   it('should return the correct shape if the post is found', async () => {
  //     prismaMock.post.findFirst.mockResolvedValue(foundPost);
  //     const result = await postService.getSinglePost({ postHash: 'test' });
  //     expect(result).toEqual({ ...foundPost });
  //     const postIdResult = await postService.getSinglePost({ postId: '1' });
  //     expect(postIdResult).toEqual(foundPost);
  //   });

  //   it('should not return the incorrect shape if the post is found', async () => {
  //     prismaMock.post.findFirst.mockResolvedValue(foundPost);
  //     const result = await postService.getSinglePost({ postHash: 'test' });
  //     const awesome = { ...foundPost, awesome: 'ttest' };
  //     expect(awesome).not.toEqual(foundPost);
  //   });
  // });

  // describe('createPostHash', () => {
  //   it('should return a string of length if there is no posthash in the db', async () => {
  //     await prismaMock.postHash.findUnique.mockResolvedValue(null);
  //     const response = await postService.createPostHash();
  //     expect(response).toEqual(MOCK_NANO);
  //   });

  //   it('should return a postHash if it the third try results in no hash found', async () => {
  //     await prismaMock.postHash.findUnique
  //       .mockResolvedValue(null)
  //       .mockResolvedValueOnce({ postHash: 'test' })
  //       .mockResolvedValueOnce({ postHash: 'test' });
  //     const response = await postService.createPostHash();
  //     expect(response).toEqual(MOCK_NANO);
  //   });

  //   it('should return null if the nano is found four times', async () => {
  //     await prismaMock.postHash.findUnique.mockResolvedValue({ postHash: 'foind=times' });
  //     const response = await postService.createPostHash();
  //     expect(response).toBeNull();
  //   });
  // });

  // describe('getPersonalizedUserProperties', () => {
  //   it('should return the correct shape', async () => {
  //     const result = await postService.getPersonalizedUserProperties({
  //       userId: 'test',
  //       post: foundPost,
  //     });

  //     expect(JSON.stringify(Object.keys(result).sort())).toEqual(
  //       JSON.stringify(['hasLikedPost', 'hasFlaggedPost', 'isFollowingUser'].sort())
  //     );
  //   });

  //   it('should return hasFlaggedPost as true if the user has flagged the post in the past', async () => {
  //     prismaMock.postFlag.findFirst.mockResolvedValue({ id: 'test' } as any);
  //     const result = await postService.getPersonalizedUserProperties({
  //       userId: 'test',
  //       post: foundPost,
  //     });
  //     expect(result.hasFlaggedPost).toEqual(true);
  //     expect(result.hasLikedPost).toEqual(false);
  //     expect(result.isFollowingUser).toEqual(false);
  //     expect(result.hasFlaggedPost).not.toEqual(false);
  //   });

  //   it('should return hasLikedPost as true if the user id is in the likes array', async () => {
  //     prismaMock.postFlag.findFirst.mockResolvedValue(null);
  //     prismaMock.postLike.findFirst.mockResolvedValue({ id: 'test' } as any);
  //     const result = await postService.getPersonalizedUserProperties({
  //       userId: foundPost.postLikes[0].profile.id,
  //       post: foundPost,
  //     });
  //     expect(result.hasLikedPost).toEqual(true);
  //     expect(result.hasFlaggedPost).toEqual(false);
  //     expect(result.isFollowingUser).toEqual(false);
  //     expect(result.hasLikedPost).not.toEqual(false);
  //   });

  //   it('should return isFollowingUser as true if the user is found as following', async () => {
  //     prismaMock.postFlag.findFirst.mockResolvedValue(null);
  //     prismaMock.profile.findFirst.mockResolvedValue({ id: 'test' } as any);
  //     const result = await postService.getPersonalizedUserProperties({
  //       userId: foundPost.profile.id,
  //       post: foundPost,
  //     });
  //     expect(result.isFollowingUser).toEqual(true);
  //     expect(result.hasLikedPost).toEqual(true);
  //     expect(result.hasFlaggedPost).toEqual(false);
  //     expect(result.isFollowingUser).not.toEqual(false);
  //   });
  // });

  // describe('createPost', () => {
  //   let image: Express.Multer.File;
  //   beforeEach(() => {
  //     image = {
  //       buffer: Buffer.from('test'),
  //       mimetype: 'image/jpeg',
  //       originalname: 'testOriginalName.jpg',
  //       filename: 'testFilename.jpg',
  //       fieldname: 'croppedImage',
  //       encoding: '7bit',
  //       size: 100,
  //       destination: 'memory',
  //       path: 'memory',
  //     } as Express.Multer.File;
  //   });

  //   it('should return a post with the correct info if the correct input is passed in', async () => {
  //     const [buffer] = await getImageFileNode(oneAspect);
  //     image.buffer = buffer;
  //     const imageData = {
  //       originalImageName: 'testOriginalName.jpg',
  //       aspectRatio: 1,
  //       dimensions: {
  //         width: 400,
  //         height: 400,
  //       },
  //     };
  //     const imageProperties = await getImageProperties({
  //       username: 'test',
  //       userId: 'test',
  //       image,
  //       imageData,
  //       altText: 'test',
  //     });
  //     await prismaMock.post.create.mockResolvedValue(prismaPost);
  //     await prismaMock.postLike.create.mockResolvedValue({ id: 'test' } as any);
  //     await prismaMock.media.create.mockResolvedValue({ id: 'test' } as any);
  //     const createdPost = await postService.createPost({
  //       user: supaUser as unknown as SupaUser,
  //       imageProperties,
  //       caption: 'test',
  //     });
  //     expect(imageProperties.width).toBe(400);
  //     expect(imageProperties.aspectRatio).toBe(1);
  //     expect(imageProperties.height).toBe(400);
  //     expect(imageProperties.url.includes('amazon')).toBe(true);
  //     expect(createdPost.postBody).toBe(prismaPost.postBody);
  //     expect(createdPost).toEqual(prismaPost);
  //   });
  // });
});
