import { ImageUploader } from '@features/ImageUploader';
import { ProfileModal } from '@features/ProfileModal/components';
import { AuthModal } from '@features/AuthModal';
import { CreatePostModal } from '@features/CreatePostModal';

export const MODAL_COMPONENTS = {
  AuthModal: AuthModal,
  ImageUploader: ImageUploader,
  ProfileModal: ProfileModal,
  CreatePostModal: CreatePostModal,
} as const;
