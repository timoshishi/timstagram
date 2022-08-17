import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { withApiAuth, supabaseServerClient, getUser } from '@supabase/auth-helpers-nextjs';
import { imageHash } from 'image-hash';
import { Multer } from 'multer';
import { imageService } from '@api/createSignedUrl';
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
  Param,
} from '@storyofams/next-api-decorators';

import multer from 'multer';
import { IsString } from 'class-validator';
import { getAltText, getImageProperties, resizeAvatarImage } from '@api/handleImageUpload';
import { randomUUID } from 'crypto';
import { uploadMiddleware } from '@api/handleImageUpload';
import { NextConfigComplete } from 'next/dist/server/config-shared';
import { NextServerOptions } from 'next/dist/server/next';

class ImageDTO {
  @IsString()
  caption: string;

  @IsString()
  imageData: string;
}
const FAKE_UUID = 'b41d9577-8bb8-46f0-b4a1-8409d8319955';
const FAKE_USERNAME = 'FAKE_USERNAME';

class ImageHandler {
  @Post()
  @HttpCode(201)
  @UseMiddleware(uploadMiddleware)
  public async create(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
    @Body(ValidationPipe) body: ImageDTO,
    @UploadedFile() croppedImage: any
  ) {
    const authedUser = await getUser({ req, res });
    const altText = getAltText({ caption: body.caption, username: authedUser.user?.username || FAKE_USERNAME });
    const imageProperties = await getImageProperties({
      image: croppedImage,
      userId: authedUser.user?.id || randomUUID(),
      imageJSON: body.imageData,
      altText,
      username: authedUser.user?.username || FAKE_USERNAME,
      isAvatar: req?.query?.type === 'avatar',
    });
    const buffer = (req.query.type = 'avatar' ? await resizeAvatarImage(croppedImage.buffer) : croppedImage.buffer);
    const url = await imageService.createSignedUrl({ file: buffer, fileName: imageProperties.filename! });

    res.json({ url });
  }
}
// export default withApiAuth(createHandler(DocumentsHandler));
export default createHandler(ImageHandler);

export const config = {
  api: {
    bodyParser: false,
  },
};

// export default withApiAuth(handler);
