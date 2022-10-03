import { AuthModalProps } from '@features/AuthModal/types';
import { createContext } from 'react';
import { SupaUser } from 'types/index';
import type { Post } from 'types/post';

export type PostCardContext = {
  user: SupaUser | null;
  showAuthModal: (props: AuthModalProps) => void;
  post: Post;
  triggerFetchOnIndex: () => void;
  imgUrl: string;
  page: number;
  refreshIdx: number;
  currentIdx: number;
} | null;

export const PostCardContext = createContext<PostCardContext>(null);
