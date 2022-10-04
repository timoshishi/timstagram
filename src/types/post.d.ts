import { Dimensions } from '@features/ImageUploader';
import { Tag as PrismaTag } from '@prisma/client';

export interface Author {
  username: string;
  bio: string;
  avatarUrl: string;
  avatarFilename: string | null;
  followerCount: number;
  followingCount: number;
}

export interface ImageSrcSet {
  sm: string;
  md: string;
  lg: string;
}

export type ImageSourceSizes = keyof ImageSrcSet;

export interface PostResponseLike {
  userId: string;
  username: string;
  avatarUrl: string;
  avatarFilename: string | null;
}

export interface PostMedia {
  aspectRatio: number;
  dimensions: Dimensions;
  filename: string;
  placeholder: string;
  srcSet: ImageSrcSet;
}

export interface Post {
  postId: string;
  postBody: string;
  viewCount: number;
  commentCount: number;
  comments: PostComment[];
  likes: PostResponseLike[];
  hasLiked: boolean;
  isFollowing: boolean;
  repostCount: number;
  likeCount: number;
  author: Author;
  tags: Tag[];
  createdAt: string;
  media: PostMedia[];
}

export interface PostComment {
  username: string;
  content: string;
  userId: string;
  createdAt: string;
  avatarUrl: string;
  avatarFilename: string | null;
}

export interface PostResponse {
  data: Post[];
  total: number;
  page: number;
}

export type Tag = PrismaTag;
