import { Tag } from '@prisma/client';

export interface Poster {
  username: string;
  bio: string;
  avatarUrl: string;
  followerCount: number;
  followingCount: number;
}

export interface PostResponseLike {
  userId: string;
  username: string;
  avatarUrl: string;
}

export interface Post {
  postId: string;
  viewCount: number;
  commentCount: number;
  comments: PostComment[];
  likes: PostResponseLike[];
  hasLiked: boolean;
  isFollowing: boolean;
  repostCount: number;
  likeCount: number;
  imageUrl: string;
  poster: Poster;
  postBody: string;
  tags: Tag[];
  createdAt: string;
}

export interface PostComment {
  username: string;
  content: string;
  userId: string;
  createdAt: string;
  avatarUrl: string;
}

export interface PostResponse {
  data: Post[];
  total: number;
  page: number;
}
