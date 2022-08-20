import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalModal } from '../../features/Modal';
import { ProfileModalProps, ProfileModal } from '../../features/Modal/components/ProfileModal/ProfileModal';
import { useProfileModal } from '../../features/Modal/hooks/useProfileModal';
import { Button } from '@chakra-ui/button';
import { userEvent, waitFor, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';
import { useUserHandlers } from '../../mocks/api/handlers';
import { supaUserResponse } from '../../mocks/supaUser';
import { Box, Center } from '@chakra-ui/react';
import { tokenResp } from '../tokenResponse';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modals/ProfileModal',
  component: ProfileModal,
  centered: true,
  parameters: {
    msw: {
      handlers: [
        rest.put('/api/profile', (req, res, ctx) => {
          // delay
          return res(ctx.delay(500), ctx.json({ hello: 'world' }));
        }),
        rest.delete('/api/profile', (req, res, ctx) => {
          return res(ctx.delay(500), ctx.json({ youGot: 'deleted' }));
        }),
        rest.put('/api/profile/avatar', (req, res, ctx) => {
          // delay
          return res(
            ctx.delay(500),
            ctx.json({ url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' })
          );
        }),
        rest.post('https://kwgfmfvqwtlfbskfksiv.supabase.co/auth/v1/token', (req, res, ctx) => {
          return res(ctx.json(tokenResp));
        }),
      ],
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof GlobalModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-arg
const ModalComp = (args) => {
  const [_, modalArgs, modalParams = {}] = args.openModalParams;
  const { showProfileModal } = useProfileModal();
  return (
    <Box h='100vh' w='100vw'>
      <Center>
        <Button
          mt={20}
          onClick={() => {
            showProfileModal(modalArgs, modalParams);
          }}
        >
          Open Modal
        </Button>
      </Center>
    </Box>
  );
};

const Template: ComponentStory<typeof GlobalModal> = (args) => {
  return (
    <GlobalModal>
      <ModalComp {...args} />
    </GlobalModal>
  );
};
export const NewUser = Template.bind({});
const newUserParams = [
  'ProfileModal',
  {
    initialProfileData: {
      avatarUrl: '',
      username: 'bobo',
      bio: '',
    },
  },
];
NewUser.args = {
  openModalParams: newUserParams,
};

export const ExistingUser = Template.bind({});
const existingUserParams = [
  'ProfileModal',
  {
    initialProfileData: {
      avatarUrl: '/storybook/avatar.png',
      username: 'bobo',
      bio: 'here is a super dop bio all about me and the things that i do in my lide. I bet you really like it.',
    },
  },
];

ExistingUser.args = {
  openModalParams: existingUserParams,
};

ExistingUser.play = async ({ args, canvasElement }) => {
  await userEvent.click(screen.getByRole('button', { name: /open modal/i }));
};

export const DeleteUser = Template.bind({});
const deleteUserparams = [
  'ProfileModal',
  {
    initialProfileData: {
      avatarUrl: '/storybook/avatar.png',
      username: 'bobo',
      bio: "I'm about to get deleted son",
    },
  },
];

DeleteUser.args = {
  openModalParams: deleteUserparams,
};

DeleteUser.play = async ({ args, canvasElement }) => {
  await userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  await userEvent.click(screen.getByText('Delete Account'));
  await userEvent.type(screen.getByPlaceholderText('Type "permanently delete" to confirm'), 'permanently delete');

  await userEvent.click(screen.getByText('Delete Account'));
};

// ExistingUser.parameters = {
//   msw: {
//     handlers: [
//       rest.put('/api/profile', (req, res, ctx) => {
//         // delay
//         return res(ctx.delay(500), ctx.json({ hello: 'world' }));
//       }),
//       rest.put('/api/profile/avatar', (req, res, ctx) => {
//         // delay
//         return res(
//           ctx.delay(500),
//           ctx.json({ url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' })
//         );
//       }),
//       rest.post('https://kwgfmfvqwtlfbskfksiv.supabase.co/auth/v1/token', (req, res, ctx) => {
//         return res(ctx.json(tokenResp));
//       }),
//     ],
//   },
// };
