import Chance from 'chance';
import {
  Comment,
  User,
  Post,
  Media,
  FlagReason,
  PostFlag,
  TagOnPosts,
  PostLike,
  Tag,
} from '@prisma/client';
import { customAlphabet, customRandom } from 'nanoid';

export const chanceOfTrue = (chance: number): boolean =>
  Math.random() < chance / 100;
export const intInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export type OmitDefaults<T> = Omit<T, 'createdAt' | 'id' | 'updatedAt'>;
export const flagReasons = ['ABUSIVE', 'ILLEGAL', 'COPYWRIGHT', 'OTHER'];

const createMediaIds = (numToCreate: number) =>
  [...new Array(numToCreate)].map(() => nanoid());
type ReturnsFunctionOfT = <T>(...args: any) => T[];

export const generateFunctions = <T>(
  fn,
  minTimes: number,
  maxTimes?: number
): ReturnsFunctionOfT => {
  const timesToDo = maxTimes ? intInRange(minTimes, maxTimes) : minTimes;
  const arr = [...new Array(timesToDo)];
  return function <T>(...args: any): T[] {
    return arr.map(() => fn(...args));
  };
};

export const arrIdx = (arr) => intInRange(0, arr.length);

const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789';
const nanoid = customAlphabet(alpha, 10);
const chance = new Chance();

export const createFakeUser = (): User => {
  const isVerified = chanceOfTrue(80);
  return {
    id: Math.random().toString(36).slice(2),
    username: chance.word(),
    avatarUrl: chance.url(),
    updatedAt: new Date(),
    isVerified,
    verifiedAt: isVerified ? new Date() : null,
    createdAt: new Date(),
    email: chance.email(),
    banned: chanceOfTrue(10),
    isBot: true,
  };
};

export const createPost = (user: User, media: Media): Post => {
  return {
    title: chance.sentence({ words: intInRange(4, 7) }),
    content: chance.sentence({ words: intInRange(0, 12) }),
    published: chanceOfTrue(80),
    username: user.username,
    userId: user.id,
    id: Math.random().toString(36).slice(2),
    userAvatarUrl: user.avatarUrl,
    flagCount: intInRange(0, 3),
    viewCount: intInRange(0, 100),
    likes: intInRange(0, 20),
    mediaType: chanceOfTrue(95) ? 'image' : 'gif',
    mediaUrl: media.url,
    mediaId: media.id,
    isBotPost: true,
    createdAt: new Date(),
    deleted: chanceOfTrue(2),
    flagged: chanceOfTrue(2),
    userDeleted: chanceOfTrue(2),
    isShared: false,
  };
};

export const createMedia = (
  userId: string,
  buckets: string[],
  categories: string[]
): Partial<Media> => {
  return {
    id: nanoid(),
    url: chance.url(),
    userId,
    bucket: buckets[arrIdx(buckets)],
    size: intInRange(1500, 4600),
    category: categories[arrIdx(categories)],
  };
};

export const createFlag = (post: Post, flagReasons): PostFlag => {
  const reason = flagReasons[arrIdx(flagReasons)];
  console.log(post);
  return {
    postId: post.id,
    userId: post.userId,
    reason: FlagReason[reason],
    content:
      reason === 'OTHER' ? chance.sentence({ words: intInRange(4, 8) }) : null,
  };
};

export const createLike = (posts: Post[]): OmitDefaults<PostLike> => {
  const post = posts[arrIdx(posts)];
  return {
    postId: post.id,
    userId: post.userId,
    doesLike: chanceOfTrue(80),
  };
};
export const createTag = (arr): Tag[] => {
  return arr.map((tag) => ({
    id: Math.random().toString(36).slice(2),
    name: tag,
  }));
};
const createTagOnPost = (
  posts: Post[],
  tags: Tag[]
): OmitDefaults<TagOnPosts> => {
  const post = posts[arrIdx(posts)];
  return {
    postId: post.id,
    tagId: tags[arrIdx(tags)].id,
  };
};

export const createUsers = generateFunctions<User>(createFakeUser, 10);

const users: User[] = createUsers<User>(undefined);
const createPosts = generateFunctions<Post>(createPost, 20);
const medias = createMedia(
  users[0].id,
  ['witter', 'witterAwesome'],
  ['nature', 'animals']
);
const posts: Post[] = createPosts(users[0], medias);
// create all the other things
const createPostFlags = generateFunctions<PostFlag>(createFlag, 10);
const postFlags: PostFlag[] = createPostFlags(posts[0], flagReasons);
const createPostLikes = generateFunctions<PostLike>(
  createLike,
  10,
  posts.length
);
const postLikes: PostLike[] = createPostLikes(posts);

const tags: Tag[] = createTag(['Sports', 'Nature', 'Animals']);
const createTagOnPosts = generateFunctions<TagOnPosts>(
  createTagOnPost,
  10,
  posts.length
);

const tagOnPosts: TagOnPosts[] = createTagOnPosts(posts, tags);

console.log({
  users,
  posts,
  medias,
  postFlags,
  postLikes,
  tags,
  tagOnPosts,
});

export default users;
