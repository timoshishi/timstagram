import type { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';
import { withApiAuth, supabaseServerClient, getUser } from '@supabase/auth-helpers-nextjs';
import { imageHash } from 'image-hash';
import { Multer } from 'multer';
import { nanoid } from 'nanoid';
import {
  Body,
  createHandler,
  HttpCode,
  Post,
  UploadedFile,
  UseMiddleware,
  BadRequestException,
  Req,
  Res,
  ValidationPipe,
} from '@storyofams/next-api-decorators';
import { Media } from '@prisma/client';
const { getPlaiceholder } = require('plaiceholder');

import multer from 'multer';
import { PostDTO } from '@features/ImageUploader/api/createPost';
import { MAX_MEGABYTES, MEGABYTE } from '@features/ImageUploader/utils/image-uploader.constants';
import { IsString } from 'class-validator';
import { ImageData } from '@features/ImageUploader/types/image-uploader.types';
import { randomUUID } from 'crypto';
import { access } from 'fs';

export const AVATAR_IMAGE_SIZE = 75;

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

export const imageMiddleware = multer({
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
  imageJSON,
  userId,
  altText,
  isAvatar,
}: {
  image: Express.Multer.File;
  imageJSON: string;
  userId: string;
  username: string;
  altText: string;
  isAvatar: boolean;
}): Promise<Partial<Media>> => {
  const id = randomUUID();
  const imageData: ImageData = JSON.parse(imageJSON);
  const hash = await getImageHash(image);
  const type = image.mimetype;
  const [, ext] = type.split('/');
  const aspectRatio = imageData.aspectRatio;
  const source = process.env.NEXT_PUBLIC_APP_NAME + '/' + userId + '/' + imageData.originalImageName;
  const metadata = await sharp(image.buffer).metadata();
  const { width, height, size } = metadata;
  const url = `https://${process.env.PHOTO_BUCKET}.s3.amazonaws.com/${id}.${ext}`;
  const placeholder = await createPlaceholder(image);

  return {
    id,
    url,
    alt: altText,
    bucket: process.env.PHOTO_BUCKET,
    type,
    size,
    width: isAvatar ? AVATAR_IMAGE_SIZE : width,
    height: isAvatar ? AVATAR_IMAGE_SIZE : height,
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
    const hashtags = caption.match(/#[a-zA-Z0-9]+/g);

    if (hashtags !== null) {
      return hashtags.join(' ');
    }
  }
  return `${username}'s avatar`;
};

// export const createBase64Image = async (image: Buffer): Promise<string> => {

// class ImageDTO {
//   @IsString()
//   caption: string;

//   @IsString()
//   imageData: string;
// }

// class DocumentsHandler {
//   @Post()
//   @HttpCode(201)
//   @UseMiddleware(upload)
//   public async create(
//     @Req() req: NextApiRequest,
//     @Res() res: NextApiResponse,
//     @Body(ValidationPipe) body: ImageDTO,
//     @UploadedFile() croppedImage: any
//   ) {
//     try {
//       const authedUser = await getUser({ req, res });

//       const imageData: ImageData = JSON.parse(body.imageData);
//       const hash = await getImageHash(croppedImage);

//       return res.json(authedUser);
//     } catch (error) {
//       console.error(error);
//       // return res.status(500).json(error);
//     }
//   }
// }
// export default withApiAuth(createHandler(DocumentsHandler));

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// // export default withApiAuth(handler);
