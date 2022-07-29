import { Post } from 'types/post.types';
import { makeFixture } from './makeFixture';
import { faker } from '@faker-js/faker';
import { randomIntInRange } from '@common/utils';

export const post: Post = {
  postId: faker.datatype.uuid(),
  viewsCount: 30,
  commentsCount: 23,
  description:
    "This is a long winded #description where I holler at my boy @jenkins we'll keep the length to under 300 characters my #guys.",
  commentsToRender: [
    { username: 'user1', title: 'comment1 is all about this comment' },
    { username: 'user2', title: 'comment2' },
  ],
  isFollowing: false,
  repostsCount: 7,
  likesCount: 24,
  hasLiked: true,
  imageURL: 'https://picsum.photos/id/1/400/500',
  poster: {
    username: 'hungryhungryhippo',
    avatarURL: 'https://avatars3.githubusercontent.com/u/17098180?s=460&v=4',
    followerCount: 23,
    followingCount: 12,
    userDescription: 'I am a user who is in to some super hot stuff',
  },
  tags: ['tag1', 'tag2', 'tag3', 'alongertag'],
  createdAt: '2020-01-01',
};
export const createPost = () => {
  const post: Post = {
    postId: faker.datatype.uuid(),
    viewsCount: numOrNumInRange(0, 100),
    commentsCount: numOrNumInRange(0, 100),
    description: faker.lorem.sentence(),
    commentsToRender: [
      { username: 'user1', title: 'comment1 is all about this comment' },
      { username: 'user2', title: 'comment2' },
    ],
    isFollowing: false,
    repostsCount: numOrNumInRange(0, 100),
    likesCount: numOrNumInRange(0, 100),
    hasLiked: false,
    imageURL: `https://picsum.photos/id/${randomIntInRange(1, 150)}/400/500`,
    poster: {
      username: faker.internet.userName(),
      avatarURL: faker.image.avatar(),
      followerCount: numOrNumInRange(0, 100),
      followingCount: numOrNumInRange(0, 100),
      userDescription: faker.lorem.sentence(),
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
