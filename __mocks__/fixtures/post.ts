import { Post } from 'types/post.types';
import { makeFixture } from './makeFixture';
import { faker } from '@faker-js/faker';
import { randomIntInRange } from '@common/utils';

export const post: Post = {
  postId: faker.datatype.uuid(),
  viewCount: 30,
  commentCount: 23,
  postBody:
    "This is a long winded #description where I holler at my boy @jenkins we'll keep the length to under 300 characters my #guys.",
  comments: [
    { username: 'user1', title: 'comment1 is all about this comment' },
    { username: 'user2', title: 'comment2' },
  ],
  isFollowing: false,
  likesCount: 24,
  hasLiked: true,
  imageUrl: 'https://picsum.photos/id/1/400/500',
  poster: {
    username: 'hungryhungryhippo',
    avatarUrl: 'https://avatars3.githubusercontent.com/u/17098180?s=460&v=4',
    followerCount: 23,
    followingCount: 12,
    bio: 'I am a user who is in to some super hot stuff',
  },
  tags: ['tag1', 'tag2', 'tag3', 'alongertag'],
  createdAt: '2020-01-01',
};
export const createPost = () => {
  const post: Post = {
    postId: faker.datatype.uuid(),
    viewCount: numOrNumInRange(0, 100),
    commentCount: numOrNumInRange(0, 100),
    postBody: faker.lorem.sentence(),
    comments: [
      { username: 'user1', title: 'comment1 is all about this comment' },
      { username: 'user2', title: 'comment2' },
    ],
    isFollowing: false,
    repostsCount: numOrNumInRange(0, 100),
    likes: new Array(numOrNumInRange(0, 100)),
    hasLiked: false,
    imageUrl: `https://picsum.photos/id/${randomIntInRange(1, 150)}/400/500`,
    poster: {
      username: faker.internet.userName(),
      avatarUrl: '',
      followerCount: numOrNumInRange(0, 100),
      followingCount: numOrNumInRange(0, 100),
      bio: faker.lorem.sentence(),
    },
    tags: ['tag1', 'tag2', 'tag3', 'alongertag'],
    createdAt: faker.date.past().toISOString(),
  };
  return post;
};
const numOrNumInRange = (min: number, max?: number): number => {
  max = typeof max === 'number' ? max : min;
  return faker.datatype.number({ min, max });
};
