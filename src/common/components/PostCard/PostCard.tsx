import { Flex, Box, useColorModeValue } from '@chakra-ui/react';
import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import type { Poster, PostComment } from './post.types';
import { PostFooter } from './PostFooter';
export interface PostCardProps {
  postId: string;
  viewsCount: number;
  commentsCount: number;
  commentsToRender: [PostComment?, PostComment?, PostComment?];
  hasLiked: boolean;
  isFollowing: boolean;
  repostsCount: number;
  likesCount: number;
  imageURL: string;
  poster: Poster;
  description: string;
  tags: string[];
  createdAt: string;
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
}: {
  post: PostCardProps;
}) => {
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
            <PostImage imageURL={imageURL} tags={tags} />
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
