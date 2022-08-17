import React, { useState, useCallback } from 'react';
import { GlobalModalComponent } from '../components/GlobalModalComponent';
import { Store, ShowModal } from '../types/global-modal.types';
import { GlobalModalContext } from './GlobalModalContext';

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

  const hideModal = () => {
    setIsOpen(false);
    setStore({
      modalType: null,
      componentProps: {},
      modalProps: {},
    });
  };

  return (
    <GlobalModalContext.Provider value={{ showModal, hideModal, isOpen, updateStore, modalProps, componentProps }}>
      <>
        <GlobalModalComponent
          modalType={modalType}
          componentProps={componentProps}
          modalProps={modalProps}
          isOpen={isOpen}
          hideModal={hideModal}
        />
        {children}
      </>
    </GlobalModalContext.Provider>
  );
};
