import { PrismaClient } from '@prisma/client';
import { Profile } from '@prisma/client';
import { SupabaseClient } from '@supabase/supabase-js';
import { imageService } from '@api/services/ImageService';
import { getImageProperties, resizeAvatarImage } from '@src/api/services/ImageService/handleImageUpload';
import { Controller, NextRequestWithUser } from '@api/types';
import { NextApiResponse } from 'next';
import { NextRequestWithUserFile } from '../../types';
import { SupaUser } from 'types/index';

const AVATAR_IMAGE_SIZE = 150;
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
  removeUser: Controller = async (req, res) => {
    try {
      if (!req.user) {
        res.status(401).json({
          error: 'Unauthorized',
        });
        return;
      }
      const removedUser = await this.supabaseService.auth.api.deleteUser(req.user.id);
      await this.prisma.profile.delete({
        where: {
          id: req.user.id,
        },
      });
      return res.status(200).json({
        data: removedUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: 'Server error',
      });
    }
  };
  updateProfile = async (req: NextRequestWithUser, res: NextApiResponse): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          error: 'Unauthorized',
        });
        return;
      }
      if (!req.body.bio) {
        res.status(400).json({
          error: 'Bad request',
        });
        return;
      }
      const { bio } = req.body;
      const { id } = req.user;

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

      return res.status(204).json({ profile });
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
      const { username, id } = req.body;
      const update: Partial<SupaUser> = {
        user_metadata: { username, avatarUrl: '', bio: '' },
      };

      const { user } = await this.supabaseService.auth.api.updateUserById(id, update);
      const environment = process.env.ENVIRONMENT;
      if (environment === 'local' || environment === 'test') {
        const result = await this.supabaseService.auth.api.updateUserById(id, { email_confirm: true });

        if (result.error) {
          console.error(result.error);
          return res.status(500).json({ error: 'Something went wrong' });
        }
      }
      return res.status(200).json({ user, error: null, loading: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };

  updateUserAvatar = async (req: NextRequestWithUserFile, res: NextApiResponse): Promise<void> => {
    if (!req.user) {
      throw new Error('User is not logged in');
    }
    const { file: croppedImage, body, user } = req;
    const imageData = JSON.parse(body.imageData);

    try {
      const imageProperties = await getImageProperties({
        image: croppedImage,
        userId: user.id,
        imageData,
        altText: `${user.user_metadata.username}'s avatar`,
        username: user.user_metadata.username,
      });

      const buffer = await resizeAvatarImage(croppedImage.buffer, AVATAR_IMAGE_SIZE, AVATAR_IMAGE_SIZE);

      await imageService.uploadFileToS3({
        file: buffer,
        filename: imageProperties.filename,
      });

      await this.prisma.media.create({
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

      await this.prisma.profile.update({
        where: {
          id: user.id,
        },
        data: {
          avatarUrl: imageProperties.url,
        },
      });
      return res.status(200).json({ url: imageProperties.url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
}
