import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser, withApiAuth } from '@supabase/auth-helpers-nextjs';
import { imageService } from '@api/createSignedUrl';
import {
  Body,
  createHandler,
  HttpCode,
  Post,
  UploadedFile,
  UseMiddleware,
  Req,
  Res,
  ValidationPipe,
  Catch,
} from '@storyofams/next-api-decorators';
import { IsString } from 'class-validator';
import { getAltText, getImageProperties, resizeAvatarImage } from '@api/handleImageUpload';
import { randomUUID } from 'crypto';
import { uploadMiddleware } from '@api/handleImageUpload';
import { PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { supabaseService } from '@src/lib/initServerSupabase';
import prisma from '@src/lib/prisma';
import { errorHandler } from '@common/api/api-decorators';
import { ImageData } from '@features/ImageUploader/types/image-uploader.types';
import { ProfileAPI } from '@api/profile/ProfileAPI';
const profileClient = new ProfileAPI(prisma);
class ImageDTO {
  @IsString()
  caption: string;

  @IsString()
  imageData: string;
}
const FAKE_UUID = 'b41d9577-8bb8-46f0-b4a1-8409d8319955';
const FAKE_USERNAME = 'FAKE_USERNAME';
@Catch(errorHandler)
class ImageHandler {
  @Post()
  @HttpCode(201)
  @UseMiddleware(uploadMiddleware)
  public async create(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
    @Body(ValidationPipe) body: { imageData: string },
    @UploadedFile() croppedImage: any
  ) {
    const { user } = await getUser({ req, res });
    console.log({ user });
    console.log('====================');
    const createdImage = await profileClient.updateUserAvatar({
      croppedImage,
      user,
      imageData: JSON.parse(body.imageData),
    });
    if (createdImage) {
      return res.json(createdImage);
    } else return res.status(500).json({ message: 'Error creating image' });
    // const altText = getAltText({ username: authedUser.user?.username || FAKE_USERNAME });
    // const imageProperties = await getImageProperties({
    //   image: croppedImage,
    //   userId: authedUser.user?.id || randomUUID(),
    //   imageJSON: body.imageData,
    //   altText,
    //   username: authedUser.user?.username || FAKE_USERNAME,
    //   isAvatar: req?.query?.type === 'avatar',
    // });
    // const buffer = await resizeAvatarImage(croppedImage.buffer);
    // const result: PutObjectCommandOutput = await imageService.uploadFileToS3({
    //   file: buffer,
    //   filename: imageProperties.filename,
    // });
    // // if (result.$metadata.httpStatusCode === 200) {
    // const media = await prisma.media.create({
    //   data: {
    //     ...imageProperties,
    //     kind: 'avatar',
    //   },
    // });
    // const updatedUser = await supabaseService.auth.api.updateUserById(authedUser.user.id, {
    //   user_metadata: {
    //     ...authedUser.user.user_metadata,
    //     avatarUrl: imageProperties.url,
    //   },
    // });
    // const prismaUser = await prisma.profile.update({
    //   where: {
    //     id: authedUser.user.id,
    //   },
    //   data: {
    //     avatarUrl: imageProperties.url,
    //   },
    // });
    return res.json({ status: 201, data: null, message: 'Image uploaded successfully' });
  }
}
export default withApiAuth(createHandler(ImageHandler));
// export default createHandler(ImageHandler);

export const config = {
  api: {
    bodyParser: false,
  },
};
