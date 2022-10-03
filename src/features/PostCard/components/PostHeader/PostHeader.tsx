import { Flex, Text } from '@chakra-ui/react';
import { Author } from 'types/post';
import dayjs from '@common/utils/dateFormatter';
import { PostHeaderAvatar } from '@common/components/PostHeaderAvatar';
import { PostDetail } from './PostDetail';

interface PostHeaderProps {
  author: Author;
  repostsCount: number;
  viewCount: number;
  createdAt: string;
  isFollowing: boolean;
}

export const PostHeader = ({ author, repostsCount, viewCount, createdAt, isFollowing }: PostHeaderProps) => (
  <Flex py={3} px={5} direction='column'>
    <Flex alignContent='center' justifyContent='space-between'>
      <PostHeaderAvatar username={author.username} avatarUrl={author.avatarUrl} isFollowing={isFollowing} />
      <PostDetail repostsCount={repostsCount} viewCount={viewCount} />
    </Flex>
    <Text fontSize='sm' color='gray.500' ml={1} mt={2}>
      posted {dayjs(createdAt).fromNow()}
    </Text>
  </Flex>
);
