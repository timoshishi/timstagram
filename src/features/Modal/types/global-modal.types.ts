import type { EmptyNoReturnFn } from '@common/utils';
import type { ModalProps } from '@chakra-ui/react';
import { MODAL_COMPONENTS } from '../constants/modal.constants';

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
  updateStore: UpdateStore;
  componentProps: Store<P>['componentProps'];
  modalProps: Store<P>['modalProps'];
};

export type InitialContext = GlobalContext<any>;
