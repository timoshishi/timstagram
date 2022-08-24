import { UserProvider } from '@supabase/auth-helpers-react';
import { GlobalModal } from '../src/features/Modal';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { AppLayout } from '../src/common/layout/app-layout';
import { initialize, mswDecorator } from 'msw-storybook-addon';
initialize();

import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ChakraProvider } from '@chakra-ui/react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
};

export const decorators = [
  (Story) => (
    <UserProvider supabaseClient={supabaseClient}>
      <ChakraProvider>
        <GlobalModal>
          {/* <AppLayout> */}
          <Story />
          {/* </AppLayout> */}
        </GlobalModal>
      </ChakraProvider>
    </UserProvider>
  ),
  mswDecorator,
];
