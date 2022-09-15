import type { NextApiRequest, NextApiResponse } from 'next';
import { SupaUser } from 'types/index';
import { NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { PostService } from '../services/PostService';
import type { ImageData } from '@features/ImageUploader';
export type { NextApiResponse };
export interface NextRequestWithUser extends NextApiRequest {
  user: SupaUser | null;
}

export interface NextRequestWithRequiredUser extends NextApiRequest {
  user: SupaUser;
}

export type NextMiddlewareWithUser = (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => void;

export type Controller = (req: NextRequestWithUser, res: NextApiResponse) => Promise<void>;

export interface NextRequestWithUserFile extends NextRequestWithUser {
  file: Express.Multer.File;
}

export type FileController = (req: NextRequestWithUserFile, res: NextApiResponse) => NextApiResponse<any>;

export type NextUserMiddleware = (req: NextRequestWithUser, res: NextApiResponse, next: NextFunction) => void;

export type PostQueryResponse = Prisma.PromiseReturnType<PostService['getSinglePost']>;
export interface GetImagePropertiesParams {
  image: Express.Multer.File;
  imageData: ImageData;
  userId: string;
  username: string;
  altText: string;
}
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
