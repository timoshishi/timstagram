import { Box, useColorModeValue } from '@chakra-ui/react';
import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import type { Post } from 'types/post';
import { PostFooter } from './PostFooter';
import { scaleImageWidthAndHeight } from '@common/utils/scaleImageWidthAndHeight';
import { SupaUser } from 'types/index';
import { PostCardProvider } from '../stores/PostCardProvider';

export interface PostCardProps {
  post: Post;
  setSize: (size: number) => void;
  size: number;
  currentIdx: number;
  page: number;
  imgSize?: 'sm' | 'md' | 'lg';
  user: SupaUser | null;
}

export const PostCard = ({ post, setSize, size, currentIdx, page, imgSize, user }: PostCardProps) => {
  const { media } = post;
  const firstMedia = media[0];

  const { width, height } = scaleImageWidthAndHeight({
    screenSize: imgSize || 'md',
    aspectRatio: firstMedia.aspectRatio,
  });

  return (
    <PostCardProvider
      post={post}
      setSize={setSize}
      currentIdx={currentIdx}
      size={size}
      page={page}
      imgSize={imgSize}
      user={user}
    >
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
        data-testid='post-card'
      >
        <Box>
          <PostHeader />
          <PostImage imgSize={imgSize} width={width} height={height} />
        </Box>
        <PostFooter />
      </Box>
    </PostCardProvider>
  );
};

export default PostCard;
