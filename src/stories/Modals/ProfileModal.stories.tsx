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

// export const FirstLogin = Template.bind({});
// const firstLoginParams = [
//   'ProfileModal',
//   {
//     initialProfileData: {
//       userId: '123',
//       email: 'yelllll@mar.com',
//     },
//   },
//   {
//     closeOnOverlayClick: false,
//     closeOnEsc: false,
//   },
// ];

// FirstLogin.args = {
//   openModalParams: firstLoginParams,
// };

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
  // const canvas = within(canvasElement);
  await userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  // await waitFor(() => expect(screen.getByTestId('email')).toBeInTheDocument());
  // await userEvent.type(screen.getByTestId('email'), 'tim@test.com');
  // await userEvent.type(screen.getByTestId('password'), 'password');
  // await userEvent.type(screen.getByTestId('username'), 'susaa');
  // await waitFor(() => expect(screen.getByTestId('email')).toHaveValue('tim@test.com'));
  // await userEvent.click(screen.getByRole('button', { name: /Sign up/ }));
};
ExistingUser.parameters = {
  msw: {
    handlers: [
      // rest.post(SIGNUP_URL, (req, res, ctx) => {
      //   return res(ctx.delay(600), ctx.json());
      // }),
      rest.put('/api/profile', (req, res, ctx) => {
        // delay
        return res(ctx.delay(500), ctx.json({ hello: 'world' }));
      }),
      rest.put('/api/profile/avatar', (req, res, ctx) => {
        // delay
        return res(
          ctx.delay(500),
          ctx.json({ url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' })
        );
      }),
      // rest.get('/api/auth/user', (req, res, ctx) => {
      //   return res(ctx.json(supaUserResponse));
      // }),
    ],
  },
};
