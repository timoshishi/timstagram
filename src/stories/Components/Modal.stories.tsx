import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Button } from '@chakra-ui/react';
import {
  AuthModalProps,
  GlobalModal,
  useGlobalModalContext,
} from '../../common/components/Modal/GlobalModal';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Modal',
  component: GlobalModal,
  centered: true,
} as ComponentMeta<typeof GlobalModal>;

export const AuthModal = (...args) => {
  const { showModal } = useGlobalModalContext<AuthModalProps>();

  return (
    <Button
      onClick={() =>
        showModal(
          'AuthModal',
          { viewType: args[0].viewType },
          args[0].modalProps
        )
      }>
      Open the modal
    </Button>
  );
};

AuthModal.argTypes = {
  viewType: {
    control: { type: 'radio' },
    options: [
      'sign_up',
      'sign_in',
      'forgotten_password',
      'magic_link',
      'update_password',
    ],
    default: 'sign_up',
  },
  modalProps: {
    size: 'sm',
  },
};
// More on args: https://storybook.js.org/docs/react/writing-stories/args

// Primary.args = {
//   onFileAccepted: (file) => {
//     console.log(file, 'FILE');
//   },
// };
