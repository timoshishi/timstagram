import React, { useState, createContext, useContext, Children } from 'react';
import { AuthModal } from '../Auth';
import { Portal, Modal as ChakraModal, ModalProps } from '@chakra-ui/react';
import { ImageUploader } from '@features/ImageUploader';

export const MODAL_COMPONENTS = {
  AuthModal: AuthModal,
  ImageUploader: ImageUploader,
};

export type ModalType = keyof typeof MODAL_COMPONENTS;
export type ModalComponent = typeof MODAL_COMPONENTS[ModalType];
interface Store<P = {}> {
  modalType: ModalType | null;
  componentProps: P;
  modalProps: Partial<ModalProps>;
}

type ShowModal = <P>(modalType: ModalType, componentProps: P, modalProps?: Partial<ModalProps>) => void;

type ContextType<P> = {
  showModal: ShowModal;
  hideModal: () => void;
  isOpen: boolean;
  store: Store<P>;
};

type InitialContext = ContextType<any>;

const initalState: InitialContext = {
  showModal: () => {},
  hideModal: () => {},
  isOpen: false,
  store: {
    modalType: null,
    componentProps: {},
    modalProps: {},
  },
};

const GlobalModalContext = createContext(initalState);

export function useGlobalModalContext<P>(): ContextType<P> {
  return useContext<ContextType<P>>(GlobalModalContext);
}

export const GlobalModal = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState({} as Store<{}>);
  const { modalType, componentProps, modalProps }: Store = store;
  const [isOpen, setIsOpen] = useState(false);
  function showModal<P>(modalType: ModalType, componentProps: P, modalProps = {}) {
    setStore({
      modalType,
      componentProps,
      modalProps,
    });
    setIsOpen(true);
  }

  const hideModal = () => {
    setIsOpen(false);
    setStore({
      modalType: null,
      componentProps: {},
      modalProps: {},
    });
  };

  const renderComponent = () => {
    if (modalType === null) {
      return null;
    }
    const ModalComponent: ModalComponent = MODAL_COMPONENTS[modalType];
    if (!!ModalComponent) {
      return (
        <Portal>
          <ChakraModal isOpen={isOpen} onClose={hideModal} id='global-modal' {...modalProps}>
            <ModalComponent {...componentProps} />
          </ChakraModal>
        </Portal>
      );
    }
  };

  GlobalModalContext.displayName = 'GlobalModalContext';
  return (
    <GlobalModalContext.Provider value={{ store, showModal, hideModal, isOpen }}>
      <>
        {renderComponent()}
        {children}
      </>
    </GlobalModalContext.Provider>
  );
};
