/* eslint-disable */
import React from 'react';
import Image from 'next/image';
import { randomInt } from 'crypto';
import { ImageLoaderProps } from 'next/image';

interface PostImageProps {
  imageUrl: string;
  tags: string[];
  size: number;
  setSize: (size: number) => void;
  refreshIdx: number;
  currentIdx: number;
  page: number;
}
// create randomIntInRange function

export const PostImage = ({ imageUrl, tags, size, setSize, refreshIdx, currentIdx, page }: PostImageProps) => {
  return (
    <Image
      src={imageUrl}
      alt={tags.join(' ')}
      width={800}
      height={600}
      loading={currentIdx < 7 ? 'eager' : 'lazy'}
      layout='responsive' // this should be commented out when not using storybooks
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
