import { ModalProps } from '@chakra-ui/react';
import { useGlobalModalContext } from './useGlobalModal';
import type { GlobalContext } from '../types/global-modal.types';
import { ProfileModalProps } from '../components/ProfileModal/ProfileModal';
import { useCallback } from 'react';

export type UseProfileModalReturn = Omit<GlobalContext<ProfileModalProps>, 'showModal'> & {
  showProfileModal: (componentProps: ProfileModalProps, modalProps?: Partial<ModalProps>) => void;
};

export const useProfileModal = (): UseProfileModalReturn => {
  const { showModal, isOpen, componentProps, ...profileModalContext }: GlobalContext<ProfileModalProps> =
    useGlobalModalContext<ProfileModalProps>();

  const showProfileModal = useCallback<UseProfileModalReturn['showProfileModal']>(
    (props, modalProps = {}) =>
      showModal(
        'ProfileModal',
        { ...props },
        {
          ...modalProps,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [showModal]
  );
  return {
    showProfileModal,
    isOpen,
    componentProps,
    ...profileModalContext,
  } as const;
};
