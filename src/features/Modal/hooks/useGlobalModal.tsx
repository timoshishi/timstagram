import { useContext } from 'react';
import type { GlobalContext } from '../types/global-modal.types';
import { GlobalModalContext } from '../stores/GlobalModalContext';

export function useGlobalModalContext<P>(): GlobalContext<P> {
  const modalContext = useContext<GlobalContext<P>>(GlobalModalContext);
  if (modalContext === undefined) {
    throw new Error('useGlobalModalContext must be used within a GlobalModalContext');
  }
  return modalContext;
}
