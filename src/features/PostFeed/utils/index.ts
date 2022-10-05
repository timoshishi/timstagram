import { Post, PostResponseLike } from 'types/post';
import { SupaUser } from 'types/index';

export const getUsernameToShow = (
  firstLikerUsername: PostResponseLike['username'] | undefined,
  userDoesLike: boolean
): string => {
  if (userDoesLike) {
    return 'You';
  }
  return firstLikerUsername || 'Nobody';
};

export const createPostLikeCopy = ({
  likeCount,
  usernameToShow,
}: Pick<Post, 'likeCount'> & {
  usernameToShow?: PostResponseLike['username'] | 'You';
}) => {
  if (usernameToShow === 'You' && likeCount === 1) {
    return 'You like this post';
  }
  if (likeCount === 1 || likeCount === 0) {
    return `${usernameToShow} likes this post`;
  }

  if (likeCount === 2) {
    return `${usernameToShow} and ${likeCount - 1} other person like this post`;
  }

  if (likeCount > 2) {
    return `${usernameToShow} and ${likeCount - 1} other people like this post`;
  }
};

//FIXME: Optimistic
export const handleLikesArray = (
  likes: PostResponseLike[],
  currentUser: SupaUser | null,
  currentUserDoesLike: boolean
): PostResponseLike[] => {
  if (currentUser && currentUserDoesLike) {
    const likesArrayWithoutCurrentUser = likes.filter(
      ({ username }) => username !== currentUser.user_metadata.username
    );
    return [
      {
        userId: currentUser.id,
        username: currentUser.user_metadata.username,
        avatarFilename: currentUser.user_metadata.avatarFilename,
        avatarUrl: currentUser.user_metadata?.avatarUrl,
      },
      ...likesArrayWithoutCurrentUser,
    ];
  }
  return likes;
};
