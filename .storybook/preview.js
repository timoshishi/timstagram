import { UserProvider } from '@supabase/auth-helpers-react';
import { supabase } from '../src/lib/initSupabase';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

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
      <Story />
    </UserProvider>
  ),
];
