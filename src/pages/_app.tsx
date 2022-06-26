import { ChakraProvider } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import './../style.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={'dark'}>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Auth.UserContextProvider>
    </main>
  );
}
