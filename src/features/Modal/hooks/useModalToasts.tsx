import { CreateToastFnReturn, UseToastOptions } from '@chakra-ui/react';

const toastTypes = ['success', 'warning', 'info', 'error'] as const;

type ToastTypes = typeof toastTypes[number];

export type UseModalToastOptions = {
  title?: string;
  error?: unknown;
  message?: string;
  props?: UseToastOptions;
};

export type ModalToasts = {
  [key in ToastTypes]: UseModalToast;
};

type UseModalToast = (options: UseModalToastOptions) => void;

const createToastType =
  (type: ToastTypes, toast: CreateToastFnReturn): UseModalToast =>
  ({ message, props = {}, title, error }) => {
    if (error) {
      console.error(error);
    }
    toast({
      title: title || type.slice(0, 1).toUpperCase() + type.slice(1),
      description: message,
      status: type,
      duration: 5000,
      isClosable: true,
      ...props,
    });
  };

/**
 * @description Wrapper function for useToast to create a toast function for each toast type
 */
export const useModalToasts = (toast: CreateToastFnReturn): ModalToasts => {
  let toasts = {} as ModalToasts;
  toastTypes.forEach((type) => {
    toasts[type] = createToastType(type, toast);
  });
  return toasts;
};
