import { AvatarGroup, Box, Text } from '@chakra-ui/react';
import { Avatar } from '@src/common/components/Avatar';
import { SupaUser } from 'types/index';
import { PostResponseLike } from 'types/post';
import { createPostLikeCopy, getUsernameToShow, handleLikesArray } from '../utils';

const MAX_AVATARS = 2;

export interface PostLikeAvatarsProps {
  likes: PostResponseLike[];
  likeCount: number;
  currentUser: SupaUser | null;
  currentUserDoesLike: boolean;
  screenSize?: 'sm' | 'md' | 'lg';
  postId: string;
}

export const PostLikeAvatars = ({
  likes,
  likeCount,
  currentUser,
  currentUserDoesLike,
  screenSize,
  postId,
}: PostLikeAvatarsProps) => {
  const usernameToShow = getUsernameToShow(likes[0]?.username, currentUserDoesLike);
  const likesWithAvatarsFirst = likes.sort((_, likeB) => (!!likeB?.avatarFilename ? 1 : -1));
  const userHasLikedLikes = handleLikesArray(likesWithAvatarsFirst, currentUser, currentUserDoesLike);
  //TODO: GH-125 If the number of likes gets sufficiently large, we should not send it all back from the server

  const avatarSize = {
    sm: 'xs',
    md: 'sm',
    lg: 'sm',
  }[screenSize || 'md'];

  return (
    <Box w='100%'>
      {likes.length ? (
        <AvatarGroup size={avatarSize} max={MAX_AVATARS} spacing={0.5}>
          {userHasLikedLikes.map((like: PostResponseLike, i) => {
            return (
              <Avatar
                key={`${like.userId}-${postId}`}
                avatarFilename={like.avatarFilename}
                username={like.username}
                cb={() => console.info('Go to user page')}
              />
            );
          })}
        </AvatarGroup>
      ) : null}
      <Text mt={1} fontSize='xs' color='gray.500' onClick={() => console.info('Open likes modal')}>
        {createPostLikeCopy({
          likeCount,
          usernameToShow,
        })}
      </Text>
    </Box>
  );
};
