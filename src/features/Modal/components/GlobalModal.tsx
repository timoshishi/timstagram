import React, { useState, createContext, useContext, Children, useCallback } from 'react';
import { AuthModal } from './AuthModal';
import { Portal, Modal as ChakraModal, ModalProps } from '@chakra-ui/react';
import { ImageUploader } from '@features/ImageUploader';
import { ProfileModal, CreatePostModal } from '.';
import { EmptyNoReturnFn } from '@common/utils';

export const MODAL_COMPONENTS = {
  AuthModal: AuthModal,
  ImageUploader: ImageUploader,
  ProfileModal: ProfileModal,
  CreatePostModal: CreatePostModal,
};

export type ModalType = keyof typeof MODAL_COMPONENTS;
export type ModalComponent = typeof MODAL_COMPONENTS[ModalType];
export interface Store<P = {}> {
  modalType: ModalType | null;
  componentProps: P;
  modalProps: Partial<ModalProps>;
}

export type UpdateStore<P = {}> = (store: Store<P>) => void;

export type ShowModal = <P>(modalType: ModalType, componentProps: P, modalProps?: Partial<ModalProps>) => void;
export type ShowModalParams<P> = [ModalType, P, Partial<ModalProps> | undefined];

export type GlobalContext<P> = {
  showModal: ShowModal;
  hideModal: EmptyNoReturnFn;
  isOpen: boolean;
  store: Store<P>;
  updateStore: UpdateStore;
  componentProps: Store<P>['componentProps'];
  modalProps: Store<P>['modalProps'];
};

type InitialContext = GlobalContext<any>;

const initalState: InitialContext = {
  showModal: () => {},
  hideModal: () => {},
  isOpen: false,
  store: {
    modalType: null,
    componentProps: {},
    modalProps: {},
  },
  updateStore: () => {},
  componentProps: {},
  modalProps: {},
};

const GlobalModalContext = createContext(initalState);
GlobalModalContext.displayName = 'GlobalModalContext';

export function useGlobalModalContext<P>(): GlobalContext<P> {
  return useContext<GlobalContext<P>>(GlobalModalContext);
}

export const GlobalModal = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState({} as Store<{}>);
  const { modalType, componentProps, modalProps }: Store = store;
  const [isOpen, setIsOpen] = useState(false);

  const showModal: ShowModal = useCallback((modalType, componentProps, modalProps = {}) => {
    setStore({
      modalType,
      componentProps,
      modalProps,
    });
    setIsOpen(true);
  }, []);

  const updateStore = useCallback((newStore: Partial<Store>) => {
    setStore((prevStore) => ({
      ...prevStore,
      ...newStore,
    }));
  }, []);

  const getComponentProps = useCallback<() => Store['componentProps']>(() => store.componentProps, [store]);

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

  return (
    <GlobalModalContext.Provider
      value={{ store, showModal, hideModal, isOpen, updateStore, componentProps, modalProps }}
    >
      <>
        {renderComponent()}
        {children}
      </>
    </GlobalModalContext.Provider>
  );
};
