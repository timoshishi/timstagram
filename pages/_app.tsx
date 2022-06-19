import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Auth } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import './../style.css'


const App = ({ Component, pageProps }: AppProps) => {
  return (<Auth.UserContextProvider supabaseClient={supabase}>
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  </Auth.UserContextProvider>)
};

export default App;
