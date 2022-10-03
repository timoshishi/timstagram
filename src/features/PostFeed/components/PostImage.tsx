import React from 'react';
import Image from 'next/future/image';
import { DEFAULT_IMAGE_PLACEHOLDER } from '@common/constants/index';
import { ImageSourceSizes } from 'types/post';
import { usePostCard } from '../hooks/usePostCard';
import { Box } from '@chakra-ui/react';

const defaultLoader = ({ src }: { src: string; width?: number; height?: number }) => {
  return src;
};

interface PostImageProps {
  imgSize?: ImageSourceSizes;
  width: number;
  height: number;
}

export const PostImage = ({ imgSize = 'md', width, height }: PostImageProps) => {
  const { triggerFetchOnIndex, currentIdx, page, post } = usePostCard();

  const media = post.media[0];
  const tags = post.tags;

  const loadPriority = currentIdx < 3 && page === 1 ? true : false;
  const loadingStrategy = currentIdx < 7 ? 'eager' : 'lazy';

  return (
    <Box bg='blackAlpha.500' display='flex' alignItems='center' justifyContent={'center'}>
      <Image
        src={media.srcSet[imgSize]}
        alt={tags.join(' ')}
        loading={loadingStrategy}
        priority={loadPriority}
        loader={defaultLoader}
        blurDataURL={media.placeholder || DEFAULT_IMAGE_PLACEHOLDER}
        placeholder='blur'
        onError={console.error}
        width={width}
        height={height}
        onLoadingComplete={triggerFetchOnIndex}
        data-testid='post-image'
      />
    </Box>
  );
};
