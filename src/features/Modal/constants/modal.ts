import { ImageUploader } from '@features/ImageUploader';
import { ProfileModal, CreatePostModal, AuthModal } from '../components';

export const MODAL_COMPONENTS = {
  AuthModal: AuthModal,
  ImageUploader: ImageUploader,
  ProfileModal: ProfileModal,
  CreatePostModal: CreatePostModal,
} as const;

export const SIGN_UP_TEXTS = {
  LIKE: 'Sign up to show other users you like their content!',
  SAVE: 'Sign up to save your favorite content!',
  COMMENT: 'Sign up to comment on posts!',
  FOLLOW: 'Sign up to follow other users!',
  POST: 'Sign up to post your own content!',
  DEFAULT: 'Sign up to get started!',
};
