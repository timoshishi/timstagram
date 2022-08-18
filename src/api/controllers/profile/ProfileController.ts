import { PrismaClient } from '@prisma/client';
import { Profile } from '@prisma/client';
import { User, ApiError, SupabaseClient } from '@supabase/supabase-js';
import { imageService } from '@src/api/createSignedUrl';
import { getImageProperties, resizeAvatarImage } from '@src/api/handleImageUpload';
import prisma from '@src/lib/prisma';
import { SupaUser } from 'types/index';
import { ImageData } from '@features/ImageUploader/types/image-uploader.types';
import { NextRequestWithUser } from '@api/types';
import { NextApiResponse } from 'next';

const AVATAR_IMAGE_SIZE = 150;
export interface SupabaseAuthResponse {
  user: User | null;
  data: User | null;
  error: ApiError | null;
}

export class ProfileController {
  constructor(private prisma: PrismaClient, private supabaseService: SupabaseClient) {
    this.prisma = prisma;
    this.supabaseService = supabaseService;
  }

  async getProfile(id: string): Promise<Profile | null> {
    return this.prisma.profile.findUnique({
      where: {
        id,
      },
    });
  }

  async updateProfile({ bio, userId }: { bio: string; userId: string }): Promise<Profile | null> {
    return this.prisma.profile.update({
      where: {
        id: userId,
      },
      data: {
        bio,
      },
    });
  }
  /**
   * @description - adds the username to the user's metadata.
   * This is inserted into the profile table when the user is confirmed with a postgres trigger
   */
  async addMetadata(req: NextRequestWithUser, res: NextApiResponse): Promise<void> {
    const { username } = req.body;
    const { id } = req.user!;
    const { user } = await this.supabaseService.auth.api.updateUserById(id, {
      user_metadata: { username, avatarUrl: '', bio: '' },
    });
    return res.status(201).json(user);
  }

  async updateUserAvatar({
    user,
    croppedImage,
    imageData,
  }: {
    user: SupaUser;
    croppedImage: Express.Multer.File;
    imageData: ImageData;
  }) {
    const imageProperties = await getImageProperties({
      image: croppedImage,
      userId: user.id,
      imageData,
      altText: `${user.user_metadata.username}'s avatar`,
      username: user.user_metadata.username,
    });
    try {
      const buffer = await resizeAvatarImage(croppedImage.buffer, AVATAR_IMAGE_SIZE, AVATAR_IMAGE_SIZE);

      await imageService.uploadFileToS3({
        file: buffer,
        filename: imageProperties.filename,
      });
      await prisma.media.create({
        data: {
          ...imageProperties,
          width: AVATAR_IMAGE_SIZE,
          height: AVATAR_IMAGE_SIZE,
          kind: 'avatar',
          size: buffer.byteLength,
        },
      });

      await this.supabaseService.auth.api.updateUserById(user.id, {
        user_metadata: {
          ...user.user_metadata,
          avatarUrl: imageProperties.url,
        },
      });

      await prisma.profile.update({
        where: {
          id: user.id,
        },
        data: {
          avatarUrl: imageProperties.url,
        },
      });
      return { data: imageProperties.url, status: 201, error: null };
    } catch (error) {
      return { data: null, status: 500, error };
    }
  }
}
