import { Portal, Modal as ChakraModal } from '@chakra-ui/react';
import { ModalComponent, ModalType } from '../types/global-modal.types';
import { MODAL_COMPONENTS } from '../constants/modal';

export const GlobalModalComponent = ({
  modalType,
  componentProps,
  modalProps,
  isOpen,
  hideModal,
}: {
  modalType: ModalType | null;
  componentProps: any;
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
        <ModalComponent {...componentProps} />
      </ChakraModal>
    );
  }
  return null;
};
