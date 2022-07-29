import { ChakraProvider } from '@chakra-ui/react';
import { supabase } from '../lib/initSupabase';
import '../style.css';
import { StrictMode } from 'react';
import { UserProvider } from '@supabase/auth-helpers-react';
import type { AppPropsWithLayout } from 'types/page.types';
import { AppLayout } from '@common/layout/app-layout';
import { ErrorBoundary } from '@common/components/ErrorBoundary';
import { GlobalModal } from '@common/components/Modal/GlobalModal';

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <AppLayout children={page} />);
  return (
    <StrictMode>
      <UserProvider supabaseClient={supabase}>
        <ChakraProvider>
          {/* <ErrorBoundary> */}
          <GlobalModal>{getLayout(<Component {...pageProps} />)}</GlobalModal>
          {/* </ErrorBoundary> */}
        </ChakraProvider>
      </UserProvider>
    </StrictMode>
  );
}
