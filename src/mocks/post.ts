import { Post } from 'types/post.types';

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
  imageUrl: 'https://witter-dev.s3.amazonaws.com/92aa1296-28c9-4e56-a16c-73d1705511fa.png',
  tags: [],
  createdAt: '2022-09-03T18:55:10.294Z',
  poster: {
    username: 'test1',
    bio: 'Et maxime facilis temporibus nihil aut non alias repudiandae autem.',
    avatarUrl: 'https://avatars0.githubusercontent.com/u/1703?v=4',
    followerCount: 0,
    followingCount: 0,
  },
};