import prisma from '../../../lib/prisma';
import {
  createHandler,
  HttpCode,
  Post,
  Get,
  Body,
  Catch,
  ValidationPipe,
  Put,
  Req,
  Res,
} from '@storyofams/next-api-decorators';
import { ProfileAPI } from '@api/profile/ProfileAPI';
import { CreateProfileDTO } from '@api/profile/profile.dto';
import { AttachUserData, errorHandler, IsNull, IsNullable } from '@common/api/api-decorators';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@supabase/auth-helpers-nextjs';
const profileClient = new ProfileAPI(prisma);

@Catch(errorHandler)
class ProfileHandler {
  @Get()
  @HttpCode(200)
  public async getCurrent(@Body() body: any) {
    return body.userData;
  }
  @Put('/avatar')
  @HttpCode(204)
  public async updateProfileImage() {
    return 'thisis your routes';
  }
  @Put()
  @HttpCode(202)
  public async update(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
    @Body(ValidationPipe) body: CreateProfileDTO
  ) {
    const { user } = await getUser({ req, res });
    return profileClient.updateProfile({ ...body, userId: user.id });
  }
  @Post('/:id')
  @HttpCode(201)
  public async madle() {
    return 'thisis notyeroutes';
  }
  @Post()
  @HttpCode(201)
  public async create(
    @Req() req: NextApiRequest,
    @Res() res: NextApiResponse,
    @Body(ValidationPipe) body: { username: string }
  ) {
    const { user } = await getUser({ req, res });
    return profileClient.addMetadata({ ...body, id: user.id });
  }
}
export default createHandler(ProfileHandler);
