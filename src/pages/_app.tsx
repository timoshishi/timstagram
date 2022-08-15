import { ChakraProvider } from '@chakra-ui/react';
import { supabase } from '../lib/initSupabase';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

import '../style.css';
import { StrictMode } from 'react';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppPropsWithLayout } from 'types/page.types';
import { AppLayout } from '@common/layout/app-layout';
import { GlobalModal } from '@features/Modal';

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <AppLayout children={page} />);

  return (
    <StrictMode>
      <UserProvider supabaseClient={supabase}>
        <ChakraProvider>
          <GlobalModal>{getLayout(<Component {...pageProps} />)}</GlobalModal>
        </ChakraProvider>
      </UserProvider>
    </StrictMode>
  );
}
