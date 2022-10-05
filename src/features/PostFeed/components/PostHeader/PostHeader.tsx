import { Flex, Text } from '@chakra-ui/react';
import dayjs from '@common/utils/dateFormatter';
import { PostHeaderAvatar } from '@common/components/PostHeaderAvatar';
import { PostDetail } from './PostDetail';
import { usePostCard } from '@features/PostFeed/hooks/usePostCard';

interface PostHeaderProps {}

export const PostHeader = ({}: PostHeaderProps) => {
  const { post } = usePostCard();
  const { author, viewCount, createdAt, isFollowing } = post;
  return (
    <Flex py={3} px={5} direction='column'>
      <Flex alignContent='center' justifyContent='space-between'>
        <PostHeaderAvatar username={author.username} avatarFilename={author.avatarFilename} isFollowing={isFollowing} />
        <PostDetail repostsCount={0} viewCount={viewCount} />
      </Flex>
      <Text fontSize='sm' color='gray.500' ml={1} mt={2}>
        posted {dayjs(createdAt).fromNow()}
      </Text>
    </Flex>
  );
};
