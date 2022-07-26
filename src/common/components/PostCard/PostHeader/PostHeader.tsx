import { Flex, Text } from '@chakra-ui/react';
import { Poster } from '../post.types';
import dayjs from '@common/utils/dateFormatter';
import { PostHeaderAvatar } from './PostHeaderAvatar';
import { PostDetail } from './PostDetail';

interface PostHeaderProps {
  poster: Poster;
  repostsCount: number;
  viewsCount: number;
  createdAt: string;
  isFollowing: boolean;
}

export const PostHeader = ({
  poster,
  repostsCount,
  viewsCount,
  createdAt,
  isFollowing,
}: PostHeaderProps) => (
  <Flex py={3} px={5} direction='column'>
    <Flex alignContent='center' justifyContent='space-between'>
      <PostHeaderAvatar
        username={poster.username}
        avatarURL={poster.avatarURL}
        isFollowing={isFollowing}
      />
      <PostDetail repostsCount={repostsCount} viewsCount={viewsCount} />
    </Flex>
    <Text fontSize='sm' color='gray.500' ml={1} mt={2}>
      posted {dayjs(createdAt).fromNow()}
    </Text>
  </Flex>
);
