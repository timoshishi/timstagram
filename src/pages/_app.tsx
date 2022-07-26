import { ChakraProvider } from '@chakra-ui/react';
import { supabase } from '../lib/initSupabase';
import '../style.css';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppPropsWithLayout } from 'types/page-types';
import { AppLayout } from '@common/layout/app-layout';

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <AppLayout children={page} />);
  return (
    <UserProvider supabaseClient={supabase}>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </UserProvider>
  );
}
