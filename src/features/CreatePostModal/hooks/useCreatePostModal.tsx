import { useGlobalModalContext } from '@features/Modal';
import { CreatePostModalProps } from '../types';

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
