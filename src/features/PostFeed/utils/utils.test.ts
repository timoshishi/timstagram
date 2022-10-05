import { PostResponseLike } from 'types/post';
import { createPostLikeCopy, getUsernameToShow, handleLikesArray } from '.';
import { supaUser } from '../../../mocks/supaUser';
describe('getUsernameToShow', () => {
  it('should return the correct copy if the likes count is 0', () => {
    const usernameToShow = getUsernameToShow(undefined, false);
    expect(usernameToShow).toBe('Nobody');
  });
  it('should return "You" if user does like', () => {
    expect(getUsernameToShow('username', true)).toBe('You');
  });

  it('should return first liker username if user does not like', () => {
    expect(getUsernameToShow('username', false)).toBe('username');
  });
});

describe('createPostLikeCopy', () => {
  it('should return correct copy for more than 1 user, not current user', () => {
    expect(
      createPostLikeCopy({
        likeCount: 2,
        usernameToShow: 'Liker',
      })
    ).toBe('Liker and 1 other person like this post');
  });

  it('should return correct copy for more than 1 user, not current user', () => {
    expect(
      createPostLikeCopy({
        likeCount: 22,
        usernameToShow: 'Liker',
      })
    ).toBe('Liker and 21 other people like this post');
  });

  it('should return correct copy for more than one other user, including current user likes', () => {
    expect(
      createPostLikeCopy({
        likeCount: 2,
        usernameToShow: 'You',
      })
    ).toBe('You and 1 other person like this post');
  });

  it('should return correct copy for more than one other user, including current user', () => {
    expect(
      createPostLikeCopy({
        likeCount: 12,
        usernameToShow: 'You',
      })
    ).toBe('You and 11 other people like this post');
  });

  it('should return correct copy for current user and multiple other users', () => {
    expect(
      createPostLikeCopy({
        likeCount: 3,
        usernameToShow: 'You',
      })
    ).toBe('You and 2 other people like this post');
  });

  it('should return correct copy if only the current user has liked the post', () => {
    expect(
      createPostLikeCopy({
        usernameToShow: 'You',
        likeCount: 1,
      })
    ).toBe('You like this post');
  });
});

describe('handleLikesArray', () => {
  let likes: PostResponseLike[];
  let currentUser: typeof supaUser;
  let currentUserDoesLike: boolean;

  beforeEach(() => {
    likes = [
      {
        userId: '1',
        username: 'username',
        avatarFilename: 'avatarFilename',
        avatarUrl: 'avatarUrl',
      },
    ];
    currentUser = supaUser;
    currentUserDoesLike = false;
  });

  it('should return the likes array if the current user does not like the post', () => {
    expect(handleLikesArray(likes, currentUser, currentUserDoesLike)).toEqual(likes);
  });

  it('should return the likes array with the current user at the beginning if the current user likes the post', () => {
    currentUserDoesLike = true;
    expect(handleLikesArray(likes, currentUser, currentUserDoesLike)).toEqual([
      {
        userId: currentUser.id,
        username: currentUser.user_metadata.username,
        avatarFilename: currentUser.user_metadata.avatarFilename,
        avatarUrl: currentUser.user_metadata.avatarUrl,
      },
      ...likes,
    ]);
  });

  it('should return an empty array if there are no likes and there is no current user', () => {
    expect(handleLikesArray([], null, false)).toEqual([]);
  });

  it('should return the likes array with only the current user if the current user does like and the likes array is empty', () => {
    currentUserDoesLike = true;
    expect(handleLikesArray([], currentUser, currentUserDoesLike)).toEqual([
      {
        userId: currentUser.id,
        username: currentUser.user_metadata.username,
        avatarFilename: currentUser.user_metadata.avatarFilename,
        avatarUrl: currentUser.user_metadata.avatarUrl,
      },
    ]);
  });
});
