import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalModal, useGlobalModalContext, ModalType } from '../../common/components/Modal/GlobalModal';
import { ProfileModalProps, ProfileModal } from '../../features/Modal/components/ProfileModal';
import type { ShowModalParams } from '../../common/components/Modal/GlobalModal';
import { Button } from '@chakra-ui/button';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'ProfileModal',
  component: ProfileModal,
  centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof GlobalModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-arg
const ModalComp = (args) => {
  const [modalType, modalArgs, modalParams] = args.openModalParams;
  const { showModal } = useGlobalModalContext<typeof modalArgs>();

  return (
    <div>
      <Button
        onClick={() => {
          showModal<typeof modalArgs>(modalType, modalArgs, modalParams);
        }}
      >
        Open Modal
      </Button>
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

export const FirstLogin = Template.bind({});
const firstLoginParams: ShowModalParams<ProfileModalProps> = [
  'ProfileModal',
  {
    initialProfileData: {
      userId: '123',
      email: 'yelllll@mar.com',
    },
  },
  {
    size: 'xl',
    preserveScrollBarGap: false,
    scrollBehavior: 'inside',
    closeOnOverlayClick: false,
    closeOnEsc: false,
  },
];

FirstLogin.args = {
  openModalParams: firstLoginParams,
};

export const ExistingUser = Template.bind({});
const existingUserParams: [ModalType, ProfileModalProps] = [
  'ProfileModal',
  {
    initialProfileData: {
      userId: '123',
      email: 'yelllll@mar.com',
      description: 'I am a description that is super long winded',
      username: 'SuperChicken',
      avatarUrl: 'https://gravatar.com/avatar/7d5f4fc9a1ca8add1bc220c41d1c1b5a?s=400&d=robohash&r=x',
    },
  },
];

ExistingUser.args = {
  openModalParams: existingUserParams,
};
