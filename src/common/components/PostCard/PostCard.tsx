import { Flex, Box, useColorModeValue, useDisclosure } from '@chakra-ui/react';
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
  post: {
    postId,
    viewsCount,
    description,
    commentsCount,
    commentsToRender,
    hasLiked,
    createdAt,
    isFollowing,
    repostsCount,
    likesCount,
    imageURL,
    poster,
    tags,
  },
  setSize,
  size,
  refreshIdx,
  currentIdx,
  page,
}: PostCardProps) => {
  return (
    <Flex w='100%' alignItems='center' justifyContent='center'>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW='100%'
        minW='md'
        borderWidth='1px'
        rounded='lg'
        shadow='sm'
        position='relative'>
        <Box w='100%' h='70%' display='block'>
          <PostHeader
            poster={poster}
            repostsCount={repostsCount}
            viewsCount={viewsCount}
            createdAt={createdAt}
            isFollowing={isFollowing}
          />
          <Box minW='100%' h='auto' position='relative'>
            <PostImage
              imageURL={imageURL}
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
          description={description}
          hasLiked={hasLiked}
          likesCount={likesCount}
          username={poster.username}
          commentsCount={commentsCount}
        />
      </Box>
    </Flex>
  );
};

export default PostCard;
