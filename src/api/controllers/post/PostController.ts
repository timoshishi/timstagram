import { PostHash, Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { imageService } from '@src/api/createSignedUrl';
import { getImageProperties, resizeAvatarImage } from '@src/api/handleImageUpload';
import { FileController, NextRequestWithUser, NextRequestWithUserFile } from '@api/types';
import { customNano } from '@src/lib/customNano';
import { NextApiResponse } from 'next';
import { randomUUID } from 'crypto';

export class PostController {
  constructor(private prisma: PrismaClient) {
    this.prisma = prisma;
  }

  createPostHash = async (): Promise<string | null> => {
    let result: PostHash | null;
    //TODO: Change this to a get req to the PostHash table that has pre-generated base62 encoded hashes
    let nano: string | null = null;
    for (let retries = 0; retries < 3; retries++) {
      nano = customNano();

      result = await this.prisma.postHash.findUnique({
        where: {
          postHash: nano,
        },
      });
      if (!result) {
        break;
      }
    }
    return nano;
  };

  createPost = async (req: NextRequestWithUserFile, res: NextApiResponse) => {
    if (!req.user) {
      throw new Error('User is not logged in');
    }
    const { file: croppedImage, body, user } = req;

    try {
      const imageData = JSON.parse(body.imageData);
      const postHash = await this.createPostHash();
      if (!postHash) {
        throw new Error('Could not create post hash');
      }
      const imageProperties = await getImageProperties({
        image: croppedImage,
        userId: user.id,
        imageData,
        altText: `${user.user_metadata.username}'s avatar`,
        username: user.user_metadata.username,
      });
      const postId = randomUUID();
      const hashUrl = await this.prisma.postHash.create({
        data: {
          postHash,
        },
      });

      const post = await this.prisma.post.create({
        data: {
          id: postId,
          mediaId: imageProperties.id,
          postHash,
          userId: user.id,
          username: user.user_metadata.username,
          mediaType: imageProperties.type,
          postBody: body.caption,
          mediaUrl: imageProperties.url,
        },
      });
      console.log({ post });

      const signedUrl = await imageService.createSignedUrl({
        filename: imageProperties.filename,
        file: croppedImage,
      });
      console.log({ signedUrl });

      const createdMedia = await this.prisma.media.create({
        data: {
          userId: user.id,
          aspectRatio: imageProperties.aspectRatio,
          width: imageProperties.width,
          height: imageProperties.height,
          bucket: imageProperties.bucket,
          filename: imageProperties.filename,
          type: imageProperties.type,
          source: imageProperties.source,
          url: imageProperties.url,
          userMetadata: {} as any,
          size: croppedImage.buffer.byteLength,
          kind: 'post',
          hash: imageProperties.hash,
          postId: postId,
        },
      });

      return res.status(200).json({ imageProperties, signedUrl, createdMedia, post, postHash });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  };
}
