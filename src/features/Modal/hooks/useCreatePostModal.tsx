import { useGlobalModalContext } from '@common/components/Modal/GlobalModal';
import { ContextType } from 'react';
import { CreatePostModalProps } from '../components/CreatePostModal';

export const useCreatePostModal = () => {
  const { showModal, hideModal, updateStore, getComponentProps } = useGlobalModalContext<CreatePostModalProps>();

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
    getComponentProps,
  } as const;
};
