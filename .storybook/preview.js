import { UserProvider } from '@supabase/auth-helpers-react';
import { GlobalModal } from '../src/features/Modal';
// import { supabase } from '../src/lib/initSupabase';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { AppLayout } from '../src/common/layout/app-layout';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { Navbar } from '../src/common/layout/app-layout/Navbar';
if (typeof global.process === 'undefined') {
  const { worker } = require('../src/mocks/browser');
  worker.start();
}
initialize();

import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

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
      <GlobalModal>
        <Story />
      </GlobalModal>
    </UserProvider>
  ),
  mswDecorator,
];
