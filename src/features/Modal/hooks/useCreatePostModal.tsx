import { useGlobalModalContext } from './useGlobalModal';
import { CreatePostModalProps } from '../components';
import { createPost } from '@features/ImageUploader/api/createPost';
import { GetCroppedImageReturn, ImageData } from '@features/ImageUploader/types/image-uploader.types';

export type HandleSubmitPost = ({
  croppedImageData,
  caption,
}: {
  croppedImageData: GetCroppedImageReturn | null;
  caption: string;
}) => Promise<void>;

export const useCreatePostModal = () => {
  const { showModal, ...rest } = useGlobalModalContext<CreatePostModalProps>();

  const showPostModal = (props: any = {}) =>
    showModal(
      'CreatePostModal',
      { ...props },
      {
        size: ['md', 'lg', '3xl'],
        initialFocusRef: undefined,
        isCentered: true,
      }
    );

  return {
    showPostModal,
    ...rest,
  } as const;
};
