import sharp from 'sharp';
import { imageHash } from 'image-hash';
import { BadRequestException } from '@storyofams/next-api-decorators';
const { getPlaiceholder } = require('plaiceholder');
import multer from 'multer';
import { MAX_MEGABYTES, MEGABYTE } from '../../../features/ImageUploader/constants';
import { randomUUID } from 'crypto';
export const AVATAR_IMAGE_SIZE = 150;
import type { ImageProperties, GetImagePropertiesParams } from '../../types';
import { Environment } from 'types/environment';
import { ImageSrcSet } from 'types/post';
import { Dimensions } from '@features/ImageUploader';
import { scaleImageWidthAndHeight } from '@common/utils/scaleImageWidthAndHeight';

export const constructMediaUrl = ({
  filename,
  bucket,
  imageHostDomain,
}: {
  filename: string;
  bucket?: Environment['PHOTO_BUCKET'] | Environment['IMAGE_STACK_ID'];
  imageHostDomain?: Environment['IMAGE_HOST_DOMAIN'] | Environment['IMAGE_STACK_DOMAIN'];
}): string => {
  const url = `https://${bucket || process.env.PHOTO_BUCKET}.${
    imageHostDomain || process.env.IMAGE_HOST_DOMAIN
  }/${filename}`;
  return url;
};

export const constructSrcSet = ({
  filename,
  imageStackId,
  imageStackDomain,
  aspectRatio,
}: {
  filename: string;
  imageStackId: Environment['IMAGE_STACK_ID'];
  imageStackDomain: Environment['IMAGE_STACK_DOMAIN'];
  aspectRatio: number;
}): ImageSrcSet => {
  const { sm, md, lg } = getScreenImageDimensions(aspectRatio);

  return {
    sm: constructStackUrl({
      filename,
      imageStackId,
      imageStackDomain,
      dimensions: sm,
    }),
    md: constructStackUrl({
      filename,
      imageStackId,
      imageStackDomain,
      dimensions: md,
    }),
    lg: constructStackUrl({
      filename,
      imageStackId,
      imageStackDomain,
      dimensions: lg,
    }),
  };
};

export const constructStackUrl = ({
  dimensions: { width, height },
  filename,
  imageStackId,
  imageStackDomain,
}: {
  dimensions: Dimensions;
  filename: string;
  imageStackId: Environment['IMAGE_STACK_ID'];
  imageStackDomain: Environment['IMAGE_STACK_DOMAIN'];
}): string => {
  return `https://${imageStackId}.${imageStackDomain}/fit-in/${width}x${height}/filters:upscale()/${filename}`;
};

export const getScreenImageDimensions = (
  aspectRatio: number
): {
  sm: Dimensions;
  md: Dimensions;
  lg: Dimensions;
} => {
  return {
    sm: scaleImageWidthAndHeight({ screenSize: 'sm', aspectRatio }),
    md: scaleImageWidthAndHeight({ screenSize: 'md', aspectRatio }),
    lg: scaleImageWidthAndHeight({ screenSize: 'lg', aspectRatio }),
  };
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
  fileFilter: (req, file: Express.Multer.File, cb) => {
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
}: GetImagePropertiesParams): Promise<ImageProperties> => {
  const id = randomUUID();
  const hash = await getImageHash(image);
  const type = image.mimetype;
  const [, ext] = type.split('/');
  const filename = `${id}.${ext}`;
  const aspectRatio = imageData.aspectRatio;
  const source = process.env.NEXT_PUBLIC_APP_NAME + '/' + userId + '/' + imageData.originalImageName;
  const metadata = await sharp(image.buffer).metadata();
  const { width, height, size } = metadata;
  const { width: imageWidth, height: imageHeight } = imageData.dimensions;
  const url = constructMediaUrl({ filename });
  const placeholder = await createPlaceholder(image);
  const aspect = width && height ? width / height : aspectRatio;

  return {
    id,
    url,
    filename,
    bucket: process.env.PHOTO_BUCKET!,
    alt: altText,
    domain: process.env.IMAGE_HOST_DOMAIN!,
    type,
    size: size || image.buffer.byteLength,
    width: width || imageWidth,
    height: height || imageHeight,
    aspectRatio: aspect,
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

export const getAltText = ({ caption }: { caption: string }): string => {
  const hashtags = caption.split(' ').filter((word) => word.startsWith('#'));
  return hashtags.length ? hashtags.join(' ') : caption;
};
