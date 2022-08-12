import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalModal, useGlobalModalContext, ModalType } from '../../features/Modal/components/GlobalModal';
import { ViewType } from '../../types/auth.types';
import { AuthModalProps } from '../../features/Modal/components/AuthModal/AuthModal';
import { ProfileModalProps } from '../../features/Modal/components/ProfileModal/ProfileModal';

import { Button } from '@chakra-ui/button';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modals/Modal',
  component: GlobalModal,
  centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof GlobalModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-arg
const ModalComp = (args) => {
  // const { handleModal, isOpen, setModalProps } = useModal();
  const [modalType, modalArgs] = args.openModalParams;
  const { showModal } = useGlobalModalContext<typeof modalArgs>();
  return (
    <div>
      <Button onClick={() => showModal(modalType, modalArgs)}>Open Modal</Button>
    </div>
  );
};

const Template: ComponentStory<typeof GlobalModal> = (args) => {
  return (
    <GlobalModal>
      <ModalComp {...args} />
    </GlobalModal>
  );
};

type AuthModalParams = [ModalType, AuthModalProps];
export const AuthModalStory = Template.bind({});
const authModalParams: AuthModalParams = ['AuthModal', { viewType: 'sign_up' }];
AuthModalStory.args = {
  openModalParams: authModalParams,
};

export const ImageUploaderModal = Template.bind({});
ImageUploaderModal.args = {
  openModalParams: ['ImageUploader', { cropType: 'rect', title: "Let's upload an image" }],
};
export const CreatePostModal = Template.bind({});
CreatePostModal.args = {};

export const ProfileModal = Template.bind({});
const profileModalParams: [ModalType, ProfileModalProps] = [
  'ProfileModal',
  {
    initialProfileData: {
      userId: '123',
      email: 'yelllll@mar.com',
      description: 'I am a description',
    },
  },
];

ProfileModal.args = {
  openModalParams: profileModalParams,
};
