import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalModal } from '../../features/Modal';
import { AuthModal, useAuthModal } from '../../features/Modal';
import { Button } from '@chakra-ui/button';
import { userEvent, waitFor, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
import { SIGN_UP_TEXTS } from '../../features/Modal/constants/modal';
import { VIEWS } from '../../features/Modal/components/AuthModal/Auth';
import { rest } from 'msw';
export default {
  title: 'Modals/AuthModal',
  component: AuthModal,
  centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    viewType: {
      control: {
        type: 'select',
        defaultValue: '',
      },
      options: [...Object.values(VIEWS)],
    },
    signUpActionType: {
      control: {
        type: 'select',
        defaultValue: '',
      },
      options: [...Object.keys(SIGN_UP_TEXTS)],
    },
    handleSubmit: { action: true },
  },
} as ComponentMeta<typeof GlobalModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-arg
const ModalComp = (args) => {
  const { showAuthModal } = useAuthModal();
  console.info(args.signUpActionType);
  return (
    <div>
      <Button
        onClick={() => {
          showAuthModal({ viewType: args.viewType, signUpActionType: args.signUpActionType });
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
      <ModalComp />
    </GlobalModal>
  );
};

export const Primary = Template.bind({});
export const SignUp = Template.bind({});
SignUp.args = {
  viewType: 'sign_up',
  signUpActionType: '',
};
SignUp.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  await waitFor(() => expect(screen.getByTestId('email')).toBeInTheDocument());
  await userEvent.type(screen.getByTestId('email'), 'tim@test.com');
  await userEvent.type(screen.getByTestId('password'), 'password');
  await userEvent.type(screen.getByTestId('username'), 'susaa');
  await waitFor(() => expect(screen.getByTestId('email')).toHaveValue('tim@test.com'));
  await userEvent.click(screen.getByRole('button', { name: /Sign up/ }));
};

const SUPABASE_AUTH_URL = 'https://kwgfmfvqwtlfbskfksiv.supabase.co/auth/v1';
const SIGN_UP_RESPONSE = {
  id: '1fece489-59d8-47f5-88c1-c1e61c745716',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'timfrrst@gmail.coma',
  phone: '',
  confirmation_sent_at: '2022-08-15T14:30:08.494362463Z',
  app_metadata: { provider: 'email', providers: ['email'] },
  user_metadata: {},
  identities: [
    {
      id: '1fece489-59d8-47f5-88c1-c1e61c745716',
      user_id: '1fece489-59d8-47f5-88c1-c1e61c745716',
      identity_data: { sub: '1fece489-59d8-47f5-88c1-c1e61c745716' },
      provider: 'email',
      last_sign_in_at: '2022-08-15T14:30:08.492196291Z',
      created_at: '2022-08-15T14:30:08.49225Z',
      updated_at: '2022-08-15T14:30:08.492254Z',
    },
  ],
  created_at: '2022-08-15T14:30:08.489699Z',
  updated_at: '2022-08-15T14:30:08.995585Z',
};

SignUp.parameters = {
  msw: {
    handlers: [
      rest.post(SUPABASE_AUTH_URL + '/signup', (req, res, ctx) => {
        return res(ctx.delay(600), ctx.json(SIGN_UP_RESPONSE));
      }),
      rest.post('/api/profile', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(SIGN_UP_RESPONSE));
      }),
      rest.post(SUPABASE_AUTH_URL + '/recover', (req, res, ctx) => {
        return res(ctx.delay(500), ctx.json(SIGN_UP_RESPONSE));
      }),
    ],
  },
};
