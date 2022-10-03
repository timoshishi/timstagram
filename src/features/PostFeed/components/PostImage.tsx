/* eslint-disable */
import React from 'react';
import Image from 'next/future/image';
import { DEFAULT_IMAGE_PLACEHOLDER } from '@common/constants/index';
import { ImageSourceSizes, PostMedia, Tag } from 'types/post';
import { scaleImageWidthAndHeight } from '@common/utils/scaleImageWidthAndHeight';

const defaultLoader = ({ src }: { src: string; width?: number; height?: number }) => {
  return src;
};

interface PostImageProps {
  media: PostMedia;
  tags: Tag[];
  size: number;
  setSize: (size: number) => void;
  refreshIdx: number;
  currentIdx: number;
  page: number;
  imgSize?: ImageSourceSizes;
}

export const PostImage = ({
  media,
  tags,
  size,
  setSize,
  refreshIdx,
  currentIdx,
  page,
  imgSize = 'md',
}: PostImageProps) => {
  const { width, height } = scaleImageWidthAndHeight({
    screenSize: imgSize,
    aspectRatio: media.aspectRatio,
  });

  return (
    <Image
      src={media.srcSet[imgSize]}
      alt={tags.join(' ')}
      loading={currentIdx < 7 ? 'eager' : 'lazy'}
      priority={currentIdx < 3 && page === 1 ? true : false}
      loader={defaultLoader}
      blurDataURL={media.placeholder || DEFAULT_IMAGE_PLACEHOLDER}
      placeholder='blur'
      onError={console.error}
      width={width}
      height={height}
      onLoadingComplete={() => {
        if (currentIdx === refreshIdx && page === size) {
          setSize(size + 1);
        }
      }}
    />
  );
};
