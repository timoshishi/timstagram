import { ModalProps } from '@chakra-ui/react';
import { GlobalContext, UpdateStore, useGlobalModalContext, Store } from '@common/components/Modal/GlobalModal';
import { ProfileModalProps } from '../components/ProfileModal';
import { useCallback } from 'react';

export type UseProfileModalReturn = {
  hideModal: () => void;
  showProfileModal: (props: ProfileModalProps, modalProps?: Partial<ModalProps>) => void;
  updateStore: UpdateStore<ProfileModalProps>;
  getComponentProps: () => Store<ProfileModalProps>[`componentProps`];
};

export const useProfileModal = (): UseProfileModalReturn => {
  const { showModal, hideModal, updateStore, getComponentProps }: GlobalContext<ProfileModalProps> =
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
    []
  );

  return {
    showProfileModal,
    hideModal,
    updateStore,
    getComponentProps,
  } as const;
};
