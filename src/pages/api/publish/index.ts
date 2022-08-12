import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { withApiAuth, supabaseServerClient, getUser } from '@supabase/auth-helpers-nextjs';
import { imageHash } from 'image-hash';
import { Multer } from 'multer';
//promisify the imageHash function
// auth.api.getUserByCookie()
// PUT /api/publish/:id
// POST TO PUBLISH A POST
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
import multer from 'multer';
import { PostDTO } from '@features/ImageUploader/api/createPost';
import { MAX_MEGABYTES, MEGABYTE } from '@features/ImageUploader/utils/image-uploader.constants';
import { IsString } from 'class-validator';
import axios from 'axios';

const imageHashAsync = async (image: any): Promise<string> => {
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

const upload = multer({
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

class ImageDTO {
  @IsString()
  caption: string;

  @IsString()
  imageData: string;
}

class DocumentsHandler {
  @Post()
  @HttpCode(201)
  @UseMiddleware(upload)
  public async create(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
    @Body(ValidationPipe) body: ImageDTO,
    @UploadedFile() croppedImage: any
  ) {
    try {
      // console.log('croppedImage', croppedImage);
      const authedUser = await getUser({ req, res });

      // const imageData: ImageData = JSON.parse(body.imageData);
      // const hash = await imageHashAsync(croppedImage);
      // console.log(hash.length);

      return res.json(authedUser);
    } catch (error) {
      console.error(error);
      // return res.status(500).json(error);
    }
  }
}
export default withApiAuth(createHandler(DocumentsHandler));

export const config = {
  api: {
    bodyParser: false,
  },
};

// export default withApiAuth(handler);
