import { Box, Flex, Link } from '@chakra-ui/react';
import { ActionIcons } from './ActionIcons';
import { Description } from './Description';
import { Tags } from './Tags';
import { UserLink } from './UserLink';
interface PostFooterProps {
  tags: string[];
  postId: string;
  hasLiked: boolean;
  likesCount: number;
  description: string;
  username: string;
  commentsCount: number;
}

export const PostFooter = ({
  tags,
  postId,
  hasLiked,
  description,
  username,
  commentsCount,
  likesCount,
}: PostFooterProps) => (
  <Box px='6' py={4}>
    <Flex mt='1' justifyContent='space-between' alignContent='center'>
      <Box>
        <UserLink username={username} />
        <Tags tags={tags} postId={postId} />
      </Box>
      <ActionIcons hasLiked={hasLiked} likesCount={likesCount} />
    </Flex>
    <Description description={description} postId={postId} />
    <Box mt='3'>
      <Link size={'md'} color='teal.300' fontWeight='semibold'>
        Click here to see all {commentsCount} comment
        {commentsCount !== 1 ? 's' : ''} and {likesCount} like
        {likesCount !== 1 ? 's' : ''}
      </Link>
    </Box>
  </Box>
);
