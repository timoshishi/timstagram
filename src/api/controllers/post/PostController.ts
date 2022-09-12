import { PrismaClient } from '@prisma/client';
import { NextRequestWithUserFile, NextRequestWithUser } from '../../types';
import { NextApiResponse } from 'next';
import { PostService } from '../../services/PostService';
export class PostController {
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
      const signedUrl = await this.postService.createPost({
        user,
        croppedImage,
        imageData: JSON.parse(body.imageData),
        caption: body.caption,
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
