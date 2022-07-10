import { ChakraProvider } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import theme from '../common/theme';
import '../style.css';
import { NextComponentType, NextPageContext } from 'next';
import { UserProvider } from '@supabase/auth-helpers-react';
import { ModalContextProvider } from '@chakra-ui/react';
export default function MyApp<P>({
  Component,
  pageProps,
}: {
  Component: NextComponentType<NextPageContext, any, P>;
  pageProps: P;
}) {
  return (
    <UserProvider supabaseClient={supabase}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}
