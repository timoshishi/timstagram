import { Modal as ChakraModal } from '@chakra-ui/react';
import type { ModalComponent, ModalType } from '../types';
import { MODAL_COMPONENTS } from '../constants';

export const GlobalModalComponent = ({
  modalType,
  modalProps,
  isOpen,
  hideModal,
}: {
  modalType: ModalType | null;
  modalProps: any;
  isOpen: boolean;
  hideModal: () => void;
}) => {
  if (modalType === null) {
    return null;
  }
  const ModalComponent: ModalComponent = MODAL_COMPONENTS[modalType];

  if (!!ModalComponent) {
    return (
      <ChakraModal isOpen={isOpen} onClose={hideModal} id='global-modal' {...modalProps}>
        <ModalComponent />
      </ChakraModal>
    );
  }
  return null;
};
