import sharp from 'sharp';
import { imageHash } from 'image-hash';
import { BadRequestException } from '@storyofams/next-api-decorators';
const { getPlaiceholder } = require('plaiceholder');

import multer from 'multer';
import { MAX_MEGABYTES, MEGABYTE } from '@features/ImageUploader/utils/image-uploader.constants';
import { ImageData } from '@features/ImageUploader/types/image-uploader.types';
import { randomUUID } from 'crypto';
export const AVATAR_IMAGE_SIZE = 150;

type ImageProperties = {
  id: string;
  width: number;
  height: number;
  aspectRatio: number;
  filename: string;
  url: string;
  alt: string;
  bucket: string;
  type: string;
  size: number;
  userId: string;
  hash: string;
  placeholder: string;
  source: string;
  metadata: string;
};

export const getImageHash = async (image: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    imageHash({ data: image.buffer }, 16, false, (error: Error, data: string) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

export const uploadMiddleware = multer({
  limits: {
    fileSize: MAX_MEGABYTES * MEGABYTE,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new BadRequestException('Not an image! Please upload an image.'));
    }
  },
}).single('croppedImage');

export const createPlaceholder = async (image: Express.Multer.File) => {
  const { base64 } = await getPlaiceholder(image.buffer);
  return base64;
};

export const getImageProperties = async ({
  image,
  imageData,
  userId,
  altText,
}: {
  image: Express.Multer.File;
  imageData: ImageData;
  userId: string;
  username: string;
  altText: string;
}): Promise<ImageProperties> => {
  const id = randomUUID();
  const hash = await getImageHash(image);
  const type = image.mimetype;
  const [, ext] = type.split('/');
  const aspectRatio = imageData.aspectRatio;
  const source = process.env.NEXT_PUBLIC_APP_NAME + '/' + userId + '/' + imageData.originalImageName;
  const metadata = await sharp(image.buffer).metadata();
  const { width, height, size } = metadata;

  const { width: imageWidth, height: imageHeight } = imageData.dimensions;
  const url = `https://${process.env.PHOTO_BUCKET}.s3.amazonaws.com/${id}.${ext}`;
  const placeholder = await createPlaceholder(image);

  return {
    id,
    url,
    filename: id + '.' + ext,
    alt: altText,
    bucket: process.env.PHOTO_BUCKET!,
    type,
    size: size || image.buffer.byteLength,
    width: width || imageWidth,
    height: height || imageHeight,
    aspectRatio,
    userId,
    hash,
    placeholder,
    source,
    metadata: JSON.stringify(metadata),
  };
};

export const resizeAvatarImage = async (image: Buffer, width = 75, height = 75): Promise<Buffer> => {
  return sharp(image).resize(width, height).png().toBuffer();
};

export const getAltText = ({ caption, username }: { caption?: string; username: string }): string => {
  if (caption) {
    const hashtags = caption.match(/^#[a-zA-Z0-9]{3,}( {1,}|)$/g);

    if (hashtags !== null) {
      return hashtags.join(' ');
    }
  }
  return `${username}'s avatar`;
};
