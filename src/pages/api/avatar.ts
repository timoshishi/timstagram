import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
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
import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { supabaseService } from '@src/lib/initServerSupabase';
import prisma from '@src/lib/prisma';

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
    @Body(ValidationPipe) body: Omit<ImageDTO, 'caption'>,
    @UploadedFile() croppedImage: any
  ) {
    const authedUser = await getUser({ req, res });
    const altText = getAltText({ username: authedUser.user?.username || FAKE_USERNAME });
    const imageProperties = await getImageProperties({
      image: croppedImage,
      userId: authedUser.user?.id || randomUUID(),
      imageJSON: body.imageData,
      altText,
      username: authedUser.user?.username || FAKE_USERNAME,
      isAvatar: req?.query?.type === 'avatar',
    });
    const buffer = await resizeAvatarImage(croppedImage.buffer);
    const result: PutObjectCommandOutput = await imageService.uploadFileToS3({
      file: buffer,
      filename: imageProperties.filename,
    });
    // if (result.$metadata.httpStatusCode === 200) {
    const updatedUser = await supabaseService.auth.api.updateUserById(authedUser.user.id, {
      user_metadata: {
        ...authedUser.user.user_metadata,
        avatarUrl: imageProperties.url,
      },
    });
    const prismaUser = await prisma.profile.update({
      where: {
        id: authedUser.user.id,
      },
      data: {
        avatarUrl: imageProperties.url,
      },
    });
    // }
    // console.log(imageProperties.width);
    // const url = await imageService.createSignedUrl({ file: croppedImage.buffer, fileName: imageProperties.filename! });
    return { url: imageProperties.url, prismaUser, meta: updatedUser?.user?.user_metadata };
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
