/* eslint-disable */
import React from 'react';
import Image from 'next/image';
import { randomInt } from 'crypto';
import { ImageLoaderProps } from 'next/image';

interface PostImageProps {
  imageURL: string;
  tags: string[];
}
// create randomIntInRange function

export const PostImage = ({ imageURL, tags, ...props }: PostImageProps) => {
  return (
    <Image
      src={imageURL}
      alt={tags.join(' ')}
      width={800}
      height={600}
      layout='responsive' // this should be commented out when not using storybooks
      onLoadingComplete={() => {
        console.log('image loaded');
      }}
      placeholder='blur'
      blurDataURL='data:image/jpg;base64,/9j/4AAQSkZJRgABAQEA8ADwAAD/2wB
      DAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAQECAQEB
      AgICAgICAgICAQICAgICAgICAgL/2wBDAQEBAQEBAQEBAQECAQEBAgICAgICA
      gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgL/wA
      ARCAADAAUDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EAB8QAAM
      AAQMFAAAAAAAAAAAAAAECAwcEBQYACAkTMf/EABUBAQEAAAAAAAAAAAAAAAAA
      AAIG/8QAJBEAAQIFAgcAAAAAAAAAAAAAAQURAAIDBDEGFBIVQUVRcYH/2gAMA
      wEAAhEDEQA/AAeyb5HO8o8lSLZd01Jz2nbKoK4yxDVvZqYl7uaV4CWdmZQSSS
      ST86FJBsafEJK15KD05ioNk4G6Yeg0V9bVCmZpXt08sB2hJ8DJ2Tn7H/2Q=='
      {...props}
    />
  );
};
