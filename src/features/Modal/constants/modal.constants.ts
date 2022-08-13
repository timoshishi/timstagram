import { ImageUploader } from '@features/ImageUploader';
import { ProfileModal, CreatePostModal, AuthModal } from '../components';

export const MODAL_COMPONENTS = {
  AuthModal: AuthModal,
  ImageUploader: ImageUploader,
  ProfileModal: ProfileModal,
  CreatePostModal: CreatePostModal,
} as const;
