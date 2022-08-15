import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GlobalModal } from '../../features/Modal';
import { AuthModal, useAuthModal } from '../../features/Modal';
import { Button } from '@chakra-ui/button';
import { userEvent, waitFor, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Modals/AuthModal',
  component: AuthModal,
  centered: true,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    viewType: {
      control: {
        type: 'select',
        options: ['sign_in', 'sign_up', 'forgot_password', 'change_password'],
        defaultValue: 'sign_up',
      },
    },
    onSubmit: { action: true },
  },
} as ComponentMeta<typeof GlobalModal>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-arg
const ModalComp = (args) => {
  const { showAuthModal } = useAuthModal();

  return (
    <div>
      <Button
        onClick={() => {
          showAuthModal({ viewType: 'sign_up' });
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

export const ValidValues = Template.bind({});
ValidValues.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(screen.getByRole('button', { name: /open modal/i }));
  await waitFor(() => expect(screen.getByTestId('email')).toBeInTheDocument());
  await userEvent.type(screen.getByTestId('email'), 'timfrrst@gmail.com');
  await userEvent.type(screen.getByTestId('password'), 'password');
  await userEvent.type(screen.getByTestId('username'), 'susaa');
  await userEvent.click(screen.getByRole('button', { name: /Sign up/ }));

  // await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
};

export const Primary = Template.bind({});

/*
Default.parameters = {
  msw: {
    handlers: [
      rest.get('/tasks', (req, res, ctx) => {
        return res(ctx.json(mockTasks));
      }),
    ],
  },
};
*/
