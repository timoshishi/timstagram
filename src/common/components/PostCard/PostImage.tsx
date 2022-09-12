/* eslint-disable */
import React from 'react';
import Image from 'next/image';
import { DEFAULT_IMAGE_PLACEHOLDER } from '@common/constants/index';
import { Tag } from '@src/types/post.types';
interface PostImageProps {
  imageUrl: string;
  tags: Tag[];
  size: number;
  setSize: (size: number) => void;
  refreshIdx: number;
  currentIdx: number;
  page: number;
  placeholder?: string;
}

export const PostImage = ({
  imageUrl,
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
      src={imageUrl}
      alt={tags.join(' ')}
      width={800}
      height={600}
      loading={currentIdx < 7 ? 'eager' : 'lazy'}
      layout='responsive' // this should be commented out when not using storybooks
      blurDataURL={placeholder || DEFAULT_IMAGE_PLACEHOLDER}
      placeholder='blur'
      onError={() => {
        if (currentIdx === refreshIdx && page === size) {
          setSize(size + 1);
        }
      }}
      onLoadingComplete={() => {
        if (currentIdx === refreshIdx && page === size) {
          setSize(size + 1);
        }
      }}
    />
  );
};
