import { Box, Flex, Link } from '@chakra-ui/react';
import { usePostCard } from '@features/PostFeed/hooks/usePostCard';
import { ActionIcons } from './ActionIcons';
import { Description } from './Description';
import { Tags } from './Tags';
import { UserLink } from './UserLink';

interface PostFooterProps {}

export const PostFooter = ({}: PostFooterProps) => {
  const { post } = usePostCard();
  const { tags, author, postId, commentCount, likeCount, postBody } = post;

  return (
    <Box px='6' py={4}>
      <Flex mt='1' justifyContent='space-between' alignContent='center'>
        <Box>
          <UserLink username={author.username} />
          <Tags tags={tags} postId={postId} />
        </Box>
        <ActionIcons />
      </Flex>
      <Description postBody={postBody} postId={postId} />
      <Box mt='3'>
        <Link size={'md'} color='teal.300' fontWeight='semibold'>
          Click here to see all {post.commentCount} comment
          {commentCount !== 1 ? 's' : ''} and {likeCount} like
          {likeCount !== 1 ? 's' : ''}
        </Link>
      </Box>
    </Box>
  );
};
