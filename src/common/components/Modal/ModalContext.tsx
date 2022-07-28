import React, { useState, createContext, useContext, Children } from 'react';
import { AuthModal } from '../Auth';
import { Portal, Modal as ChakraModal } from '@chakra-ui/react';
import { ViewType } from 'types/auth.types';

export interface AuthModalProps {
  viewType: ViewType;
}

export const MODAL_COMPONENTS = {
  AuthModal: AuthModal,
};

type ModalType = keyof typeof MODAL_COMPONENTS;
type ModalComponent = typeof MODAL_COMPONENTS[ModalType];
interface Store<P = {}> {
  modalType: ModalType | null;
  modalProps: P;
}

type ContextType<P> = {
  showModal: (modalType: ModalType, modalProps: P) => void;
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
    modalProps: {},
  },
};

const GlobalModalContext = createContext(initalState);

export function useGlobalModalContext<P>(): ContextType<P> {
  return useContext<ContextType<P>>(GlobalModalContext);
}

export const GlobalModal = ({ children }: { children: React.ReactNode }) => {
  // debugger;
  const [store, setStore] = useState({} as Store<{}>);
  const { modalType, modalProps }: Store = store;
  const [isOpen, setIsOpen] = useState(false);
  function showModal<P>(modalType: ModalType, modalProps: P) {
    setStore({
      modalType,
      modalProps,
    });
    setIsOpen(true);
  }

  const hideModal = () => {
    setStore({
      modalType: null,
      modalProps: {},
    });
    setIsOpen(false);
  };

  const renderComponent = () => {
    if (modalType === null) {
      return <></>;
    }
    const ModalComponent: ModalComponent = MODAL_COMPONENTS[modalType];
    if (!!ModalComponent) {
      return (
        <Portal>
          <ChakraModal
            isOpen={!!store.modalType && !!ModalComponent}
            onClose={hideModal}
            id='global-modal'>
            <ModalComponent {...modalProps} />
          </ChakraModal>
        </Portal>
      );
    }
    return null;
  };
  GlobalModalContext.displayName = 'GlobalModalContext';
  return (
    <GlobalModalContext.Provider
      value={{ store, showModal, hideModal, isOpen }}>
      <>
        {renderComponent()}
        {children}
      </>
    </GlobalModalContext.Provider>
  );
};
