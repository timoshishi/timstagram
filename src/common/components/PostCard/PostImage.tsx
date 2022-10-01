/* eslint-disable */
import React from 'react';
import Image from 'next/future/image';
import { DEFAULT_IMAGE_PLACEHOLDER } from '@common/constants/index';
import { ImageSourceSizes, PostMedia, Tag } from 'types/post';
import { scaleImageWidthAndHeight } from '@common/utils/scaleImageWidthAndHeight';
interface PostImageProps {
  media: PostMedia;
  tags: Tag[];
  size: number;
  setSize: (size: number) => void;
  refreshIdx: number;
  currentIdx: number;
  page: number;
  placeholder?: string;
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
  placeholder,
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
      // layout='responsive' // this should be commented out when not using storybooks
      loader={({ src }) => src}
      blurDataURL={placeholder || DEFAULT_IMAGE_PLACEHOLDER}
      placeholder='blur'
      onError={() => {
        if (currentIdx === refreshIdx && page === size) {
          setSize(size + 1);
        }
      }}
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
