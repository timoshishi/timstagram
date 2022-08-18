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

  updateProfile = async (req: NextRequestWithUser, res: NextApiResponse): Promise<void> => {
    try {
      const { bio } = req.body;
      const { id } = req.user!;
      if (!bio) {
        return res.status(400).json({ error: 'Bad request' });
      }

      const profile = await this.prisma.profile.update({
        where: {
          id,
        },
        data: {
          bio,
        },
        select: {
          bio: true,
          avatarUrl: true,
          username: true,
        },
      });
      console.log({ profile });

      return res.status(200).json({ profile });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Something went wrong' });
    }
  };
  /**
   * @description - adds the username to the user's metadata.
   * This is inserted into the profile table when the user is confirmed with a postgres trigger
   */
  addMetadata = async (req: NextRequestWithUser, res: NextApiResponse): Promise<void> => {
    try {
      const { username } = req.body;
      const { id } = req.user!;
      const { user } = await this.supabaseService.auth.api.updateUserById(id, {
        user_metadata: { username, avatarUrl: '', bio: '' },
      });
      if (!user) {
        throw new Error('not authenticated');
      }
      return res.status(201).json({ user, error: null, loading: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

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
