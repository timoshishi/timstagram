import { Box, Flex } from '@chakra-ui/react';
import { usePostCard } from '@features/PostFeed/hooks/usePostCard';
import { ActionIcons } from './ActionIcons';
import { Description } from './Description';
import { Tags } from './Tags';
import { UserLink } from './UserLink';
import { PostLikeAvatars } from '../PostLikeAvatars';

interface PostFooterProps {}

export const PostFooter = ({}: PostFooterProps) => {
  const { post, user } = usePostCard();
  const { tags, author, postId, likeCount, postBody } = post;

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
      <Box mt='3' w='100%'>
        <PostLikeAvatars
          likes={post.likes}
          likeCount={likeCount}
          currentUser={user}
          currentUserDoesLike={post.hasLiked}
          postId={postId}
        />
      </Box>
    </Box>
  );
};
