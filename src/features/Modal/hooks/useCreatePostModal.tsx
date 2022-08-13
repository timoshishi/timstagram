import { useGlobalModalContext } from './useGlobalModal';
import { CreatePostModalProps } from '../components';

export const useCreatePostModal = () => {
  const { showModal, hideModal, updateStore } = useGlobalModalContext<CreatePostModalProps>();

  const showPostModal = (props: CreatePostModalProps = {}) =>
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
    hideModal,
    updateStore,
  } as const;
};
