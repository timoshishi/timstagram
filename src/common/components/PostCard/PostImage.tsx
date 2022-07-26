/* eslint-disable */
import React from 'react';
import Image from 'next/image';

interface PostImageProps {
  imageURL: string;
  tags: string[];
}

export const PostImage = ({ imageURL, tags }: PostImageProps) => {
  return (
    <Image
      src={imageURL}
      alt={tags.join(' ')}
      width='100%'
      height='100%'
      style={{ maxWidth: '100%', maxHeight: '100%' }}
      layout='responsive'
      placeholder='blur'
    />
  );
};
