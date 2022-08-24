import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Navbar } from '../../common/layout/app-layout/Navbar';
import { Container } from '@chakra-ui/react';
import { userAuthResponse } from '../../mocks/api/handlers';
import { userEvent, waitFor, within, screen } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { SIGN_UP_TEXTS } from '../../features/Modal/constants/modal';
export default {
  title: 'Layout/Navbar',
  component: Navbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Navbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Navbar> = () => (
  <Container as='main' minH={'120vh'}>
    <Navbar />
  </Container>
);

export const LoggedOut = Template.bind({});
LoggedOut.parameters = {
  msw: {
    handlers: { loggedOut: userAuthResponse.loggedOut },
  },
};
LoggedOut.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await waitFor(
    () => {
      expect(canvas.getByTestId(/post-link/i)).toBeInTheDocument();
    },
    { timeout: 10000 }
  );
  await userEvent.click(screen.getByTestId(/post-link/i));
  await waitFor(() => expect(screen.getByText(SIGN_UP_TEXTS.POST)).toBeInTheDocument());
};
export const LoggedIn = Template.bind({});
LoggedIn.parameters = {
  msw: {
    handlers: {
      loggedIn: userAuthResponse.loggedIn,
    },
  },
};
LoggedIn.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await waitFor(
    () => {
      expect(canvas.getByTestId('user-avatar')).toBeInTheDocument();
    },
    { timeout: 10000 }
  );
  await userEvent.click(screen.getByTestId(/post-link/i));
  await waitFor(() => expect(screen.getByText(/tap here/gi)).toBeInTheDocument());
  await userEvent.click(screen.getByTestId('image-input'));
};
