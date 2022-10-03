import { Box, Flex, Link } from '@chakra-ui/react';
import { Tag } from 'types/post';
import { ActionIcons } from './ActionIcons';
import { Description } from './Description';
import { Tags } from './Tags';
import { UserLink } from './UserLink';
interface PostFooterProps {
  tags: Tag[];
  postId: string;
  hasLiked: boolean;
  likesCount: number;
  postBody: string;
  username: string;
  commentCount: number;
}

export const PostFooter = ({
  tags,
  postId,
  hasLiked,
  postBody,
  username,
  commentCount,
  likesCount,
}: PostFooterProps) => (
  <Box px='6' py={4}>
    <Flex mt='1' justifyContent='space-between' alignContent='center'>
      <Box>
        <UserLink username={username} />
        <Tags tags={tags} postId={postId} />
      </Box>
      <ActionIcons hasLiked={hasLiked} likesCount={likesCount} postId={postId} />
    </Flex>
    <Description postBody={postBody} postId={postId} />
    <Box mt='3'>
      <Link size={'md'} color='teal.300' fontWeight='semibold'>
        Click here to see all {commentCount} comment
        {commentCount !== 1 ? 's' : ''} and {likesCount} like
        {likesCount !== 1 ? 's' : ''}
      </Link>
    </Box>
  </Box>
);
