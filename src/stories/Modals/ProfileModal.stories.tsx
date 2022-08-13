import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalModal } from '../../features/Modal';
import { ProfileModalProps, ProfileModal } from '../../features/Modal/components/ProfileModal/ProfileModal';
import { useProfileModal } from '../../features/Modal/hooks/useProfileModal';
import { Button } from '@chakra-ui/button';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modals/ProfileModal',
  component: ProfileModal,
  centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof GlobalModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-arg
const ModalComp = (args) => {
  const [_, modalArgs, modalParams = {}] = args.openModalParams;
  const { showProfileModal } = useProfileModal();
  return (
    <div>
      <Button
        onClick={() => {
          showProfileModal(modalArgs, modalParams);
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
const firstLoginParams = [
  'ProfileModal',
  {
    initialProfileData: {
      userId: '123',
      email: 'yelllll@mar.com',
    },
  },
  {
    closeOnOverlayClick: false,
    closeOnEsc: false,
  },
];

FirstLogin.args = {
  openModalParams: firstLoginParams,
};

export const ExistingUser = Template.bind({});
const existingUserParams = [
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
