import { useToast } from '@chakra-ui/react';
import React, { useState, useCallback, useRef } from 'react';
import { GlobalModalComponent } from '../components/GlobalModalComponent';
import { ModalToasts, useModalToasts } from '../hooks/useModalToasts';
import { Store, ShowModal } from '../types';
import { GlobalModalContext } from './GlobalModalContext';

export const GlobalModal = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState({} as any);
  const { modalType, componentProps, modalProps }: Store = store;
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const showModal: ShowModal = useCallback((modalType, componentProps, modalProps = {}) => {
    setStore({
      modalType,
      componentProps,
      modalProps,
    });
    setIsOpen(true);
  }, []);

  let useModalToast = {} as ModalToasts;
  useModalToast = useRef(useModalToasts(toast)).current;

  const updateStore = useCallback((newStore: Partial<Store>) => {
    setStore((prevStore: Store) => ({
      ...prevStore,
      ...newStore,
    }));
  }, []);

  const hideModal = () => {
    setIsOpen(false);
    setStore({
      modalType: null,
      componentProps: {},
      modalProps: {},
    });
  };

  return (
    <GlobalModalContext.Provider
      value={{ showModal, hideModal, isOpen, updateStore, modalProps, componentProps, useModalToast }}
    >
      <>
        <GlobalModalComponent modalType={modalType} modalProps={modalProps} isOpen={isOpen} hideModal={hideModal} />
        {children}
      </>
    </GlobalModalContext.Provider>
  );
};
