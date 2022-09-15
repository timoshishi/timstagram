import { createContext } from 'react';
import type { InitialContext } from '../types';

import { Context } from 'react';
import { ModalToasts } from '../hooks/useModalToasts';
const initialState: InitialContext = {
  showModal: () => {},
  hideModal: () => {},
  isOpen: false,
  updateStore: () => {},
  componentProps: {},
  modalProps: {},
  useModalToast: null as unknown as ModalToasts,
};

const GlobalModalContext = createContext(initialState) as Context<InitialContext>;
GlobalModalContext.displayName = 'GlobalModalContext';
export { GlobalModalContext };
