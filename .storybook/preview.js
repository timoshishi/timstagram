import { UserProvider } from '@supabase/auth-helpers-react';
import { GlobalModal } from '../src/common/components/Modal/GlobalModal';
import { supabase } from '../src/lib/initSupabase';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'fullscreen',
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <UserProvider supabaseClient={supabase}>
      <GlobalModal>
        <Story />
      </GlobalModal>
    </UserProvider>
  ),
];
