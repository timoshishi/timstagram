import { Box, useColorModeValue } from '@chakra-ui/react';
import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import type { Post } from 'types/post.types';
import { PostFooter } from './PostFooter';

export interface PostCardProps {
  post: Post;
  setSize: (size: number) => void;
  size: number;
  refreshIdx: number;
  currentIdx: number;
  page: number;
}

export const PostCard = ({
  post: { postId, viewCount, postBody, commentCount, hasLiked, createdAt, isFollowing, likes, imageUrl, author, tags },
  setSize,
  size,
  refreshIdx,
  currentIdx,
  page,
}: PostCardProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW='100%'
      maxH='95vw'
      borderBottomWidth={1}
      borderTopWidth={1}
      borderLeftWidth={[0, 1]}
      borderRightWidth={[0, 1]}
      rounded='lg'
      shadow={['none', 'sm']}
      // position='relative'
    >
      <Box>
        <PostHeader
          author={author}
          repostsCount={0}
          viewCount={viewCount}
          createdAt={createdAt}
          isFollowing={isFollowing}
        />
        <Box>
          <PostImage
            imageUrl={imageUrl}
            tags={tags}
            setSize={setSize}
            size={size}
            refreshIdx={refreshIdx}
            currentIdx={currentIdx}
            page={page}
          />
        </Box>
      </Box>
      <PostFooter
        tags={tags}
        postId={postId}
        postBody={postBody}
        hasLiked={hasLiked}
        likesCount={likes.length}
        username={author.username}
        commentCount={commentCount}
      />
    </Box>
  );
};

export default PostCard;
