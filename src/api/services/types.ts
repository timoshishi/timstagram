import { Prisma } from '@prisma/client';
import { PostService } from './PostService';

export type PostQueryResponse = Prisma.PromiseReturnType<PostService['getSinglePost']>;

export type ImageProperties = {
  id: string;
  width: number;
  height: number;
  aspectRatio: number;
  filename: string;
  url: string;
  alt: string;
  bucket: string;
  type: string;
  size: number;
  userId: string;
  hash: string;
  placeholder: string;
  source: string;
  metadata: string;
};
