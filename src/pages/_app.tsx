import { ChakraProvider } from '@chakra-ui/react';
import { supabase } from '../lib/initSupabase';
import { UserProvider } from '@supabase/auth-helpers-react';
import { AppLayout } from '@common/layout/app-layout';
import type { AppPropsWithLayout } from 'types/page-types';

export default function MyApp<P>({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <UserProvider supabaseClient={supabase}>
      <ChakraProvider>
        {getLayout(
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        )}
      </ChakraProvider>
    </UserProvider>
  );
}
