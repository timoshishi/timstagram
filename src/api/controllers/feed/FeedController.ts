import { PrismaClient, Post as PrismaPost } from '@prisma/client';
import { NextRequestWithUserFile, NextRequestWithUser } from '../../types';
import { NextApiResponse } from 'next';
import { PostService } from '../../services/PostService';
import { getImageProperties } from '@api/services/ImageService/handleImageUpload';
import { imageService } from '../../services/ImageService';

export class FeedController {
  constructor(private prisma: PrismaClient, private postService: PostService) {
    this.prisma = prisma;
    this.postService = postService;
  }

  getPost = async (req: NextRequestWithUser, res: NextApiResponse) => {
    try {
      const id = req.query.id as string;
      const responseBody = await this.postService.getPostByHashOrId({
        userId: req.user?.id,
        postId: id,
      });
      if (responseBody === null) {
        return res.status(404).end();
      }
      return res.status(200).json(responseBody);
    } catch (error) {
      console.error(error);
      return res.status(500);
    }
  };

  createPost = async (req: NextRequestWithUserFile, res: NextApiResponse) => {
    if (!req.user) {
      throw new Error('User is not logged in');
    }
    const { file: croppedImage, body, user } = req;

    try {
      const imageProperties = await getImageProperties({
        image: croppedImage,
        userId: user.id,
        imageData: JSON.parse(body.imageData),
        altText: `${user.user_metadata.username}'s avatar`, //TODO: Handle tags as alt text
        username: user.user_metadata.username,
      });
      if (!imageProperties) {
        throw new Error('Could not get image properties');
      }
      const createdPost: PrismaPost | null = await this.postService.createPost({
        user,
        caption: body.caption,
        imageProperties,
      });

      if (!createdPost) {
        throw new Error('Could not create post');
      }

      const signedUrl = await imageService.createSignedUrl({
        filename: imageProperties.filename,
        file: croppedImage,
      });

      if (!signedUrl) {
        throw new Error('Could not create post');
      }

      return res.status(200).json({ signedUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
}
