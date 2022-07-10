import Link from 'next/link';
import useSWR from 'swr';
import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui';
import { supabase } from '../lib/initSupabase';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { CookieOptions } from '@supabase/auth-helpers-shared';
import Profile from './profile';
import { ViewType } from 'types/authtypes';
// import seedUtils, { createUsers } from '../../prisma/utils/seed-utils';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';
import { Box, Checkbox, Container } from '@chakra-ui/react';
import { Navbar } from '@common/layout/Navbar';
import { useUser } from '@supabase/auth-helpers-react';
const fetcher = (url: string, token: string) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json());

const Index = ({ profile }: { profile: User }) => {
  // const users = createUsers('');
  // const { user, session } = Auth.useUser();
  // console.log(session);
  const { user, error, isLoading } = useUser();
  // const { data, error } = useSWR(
  //   session ? ['/api/getUser', session.access_token] : null,
  //   fetcher
  // );
  const [authView, setAuthView] = useState<ViewType>('sign_in');
  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       if (event === 'PASSWORD_RECOVERY') setAuthView('update_password');
  //       if (event === 'USER_UPDATED')
  //         setTimeout(() => setAuthView('sign_in'), 1000);
  //       // Send session to /api/auth route to set the auth cookie.
  //       // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
  //       fetch('/api/auth', {
  //         method: 'POST',
  //         headers: new Headers({ 'Content-Type': 'application/json' }),
  //         credentials: 'same-origin',
  //         body: JSON.stringify({ event, session }),
  //       }).then((res) => res.json());
  //     }
  //   );

  //   return () => {
  //     authListener.unsubscribe();
  //   };
  // }, []);

  const View = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (!user)
      return (
        <Space direction='vertical' size={8}>
          <div>
            <Image
              src='/images/flow.svg'
              width='96'
              height='96'
              alt='supabase'
            />
            <Typography.Title level={3}>
              Welcome to Supabase Auth
            </Typography.Title>
          </div>
          <Button onClick={supabaseClient.auth.signOut}>Signout</Button>

          <Auth supabaseClient={supabase} view={authView} />
        </Space>
      );

    return (
      <Space direction='vertical' size={6}>
        {authView === 'update_password' && (
          <Auth.UpdatePassword supabaseClient={supabase} />
        )}
        {user && (
          <>
            <Typography.Text>You're signed in</Typography.Text>
            <Typography.Text strong>Email: {user.email}</Typography.Text>
            <Button
              icon={<Icon src='/images/flow.svg' type='LogOut' />}
              type='outline'
              onClick={() => supabase.auth.signOut()}>
              Log out
            </Button>
            {error && <Typography.Text>Failed to fetch user!</Typography.Text>}
            {user && !error ? (
              <>
                <Typography.Text type='success'>
                  User data retrieved server-side (in API route):
                </Typography.Text>

                <Typography.Text>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </Typography.Text>
              </>
            ) : (
              <div>Loading...</div>
            )}

            <Typography.Text>
              <Link href='/profile'>
                <a>SSR example with getServerSideProps</a>
              </Link>
            </Typography.Text>
          </>
        )}
      </Space>
    );
  };

  return (
    <Box style={{ width: '100vw' }}>
      <Navbar />
      <div style={{ maxWidth: '420px', margin: '96px auto' }}>
        <Card>
          <View />
        </Card>
      </div>
    </Box>
  );
};

// export const getServerSideProps = withPageAuth({
//   redirectTo: '/',
//   authRequired: false,

//   async getServerSideProps(ctx) {
//     // Retrieve provider_token from cookies
//     const provider_token = ctx.req.cookies['sb-provider-token'];
//     // Get logged in user's third-party id from metadata
//     const { user } = await getUser(ctx);
//     const userId = user?.user_metadata.provider_id;
//     const profile = await (
//       await fetch(`https://api.example.com/users/${userId}`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${provider_token}`,
//         },
//       })
//     ).json();
//     console.log({ profile, user });
//     return { props: { profile } };
//   },
// });

export default Index;
