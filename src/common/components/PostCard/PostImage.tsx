/* eslint-disable */
import React from 'react';
import Image from 'next/future/image';
import { DEFAULT_IMAGE_PLACEHOLDER } from '@common/constants/index';
import { PostMedia, Tag } from 'types/post';
interface PostImageProps {
  media: PostMedia;
  tags: Tag[];
  size: number;
  setSize: (size: number) => void;
  refreshIdx: number;
  currentIdx: number;
  page: number;
  placeholder?: string;
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
}: PostImageProps) => {
  return (
    <Image
      src={media.fallbackImageUrl}
      alt={tags.join(' ')}
      loading={currentIdx < 7 ? 'eager' : 'lazy'}
      priority={currentIdx < 3 && page === 1 ? true : false}
      // layout='responsive' // this should be commented out when not using storybooks
      blurDataURL={placeholder || DEFAULT_IMAGE_PLACEHOLDER}
      placeholder='blur'
      onError={() => {
        if (currentIdx === refreshIdx && page === size) {
          setSize(size + 1);
        }
      }}
      width={media.dimensions.width}
      height={media.dimensions.height}
      onLoadingComplete={() => {
        if (currentIdx === refreshIdx && page === size) {
          setSize(size + 1);
        }
      }}
    />
  );
};
