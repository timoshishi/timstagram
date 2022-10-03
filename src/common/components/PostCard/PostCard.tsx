import { Box, useColorModeValue } from '@chakra-ui/react';
import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import type { Post } from 'types/post';
import { PostFooter } from './PostFooter';
import { scaleImageWidthAndHeight } from '@common/utils/scaleImageWidthAndHeight';

export interface PostCardProps {
  post: Post;
  setSize: (size: number) => void;
  size: number;
  refreshIdx: number;
  currentIdx: number;
  page: number;
  imgSize?: 'sm' | 'md' | 'lg';
}

export const PostCard = ({
  post: { postId, viewCount, postBody, commentCount, hasLiked, createdAt, isFollowing, likes, media, author, tags },
  setSize,
  size,
  refreshIdx,
  currentIdx,
  page,
  imgSize,
}: PostCardProps) => {
  const firstMedia = media[0];
  const { width, height } = scaleImageWidthAndHeight({
    screenSize: imgSize || 'md',
    aspectRatio: firstMedia.aspectRatio,
  });

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      maxW={width}
      maxH='95vw'
      borderBottomWidth={1}
      borderTopWidth={1}
      borderLeftWidth={[0, 1]}
      borderRightWidth={[0, 1]}
      rounded='lg'
      shadow={['none', 'sm', 'md', 'lg']}
      // position='relative'
      data-testid='post-card'
    >
      <Box>
        <PostHeader
          author={author}
          repostsCount={0}
          viewCount={viewCount}
          createdAt={createdAt}
          isFollowing={isFollowing}
        />
        <Box bg='blackAlpha.500' display='flex' alignItems='center' justifyContent={'center'}>
          <PostImage
            media={firstMedia}
            tags={tags}
            setSize={setSize}
            size={size}
            refreshIdx={refreshIdx}
            currentIdx={currentIdx}
            page={page}
            imgSize={imgSize}
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
