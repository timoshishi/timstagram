import { createContext } from 'react';
import type { InitialContext } from '../types/global-modal.types';

const initalState: InitialContext = {
  showModal: () => {},
  hideModal: () => {},
  isOpen: false,
  updateStore: () => {},
  componentProps: {},
  modalProps: {},
};

const GlobalModalContext = createContext(initalState);
GlobalModalContext.displayName = 'GlobalModalContext';

export { GlobalModalContext };
