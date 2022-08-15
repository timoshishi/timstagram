import prisma from '../../../lib/prisma';
import { createHandler, HttpCode, Post, Get, Body, Catch, ValidationPipe, Put } from '@storyofams/next-api-decorators';
import { ProfileAPI } from '@api/profile/ProfileAPI';
import { CreateProfileDTO } from '@api/profile/profile.dto';
import { AttachUserData, errorHandler, IsNull, IsNullable } from '@common/api/api-decorators';
const profileClient = new ProfileAPI(prisma);

@Catch(errorHandler)
class ProfileHandler {
  @Get()
  @HttpCode(200)
  public async getCurrent(@Body() body: any) {
    return body.userData;
  }
  @Put()
  @HttpCode(202)
  public async update(@Body(ValidationPipe) body: CreateProfileDTO) {
    // return profileClient.createProfile(body);
  }
  @Post()
  @HttpCode(201)
  public async create(@Body(ValidationPipe) body: CreateProfileDTO) {
    return profileClient.addUsernameMetadata(body);
  }
}
export default createHandler(ProfileHandler);
