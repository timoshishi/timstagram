import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from '../lib/prisma'
import Link from 'next/link'
import useSWR from 'swr'
import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui'
import { supabase } from '../lib/initSupabase'
import { useEffect, useState } from 'react'


const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())


// export const getServerSideProps: GetServerSideProps = async () => {
//   const feed = await prisma.post.findMany({
//     where: {
//       published: true,
//     },
//     include: {
//       author: {
//         select: {
//           name: true,
//         },
//       },
//     },
//   });
//   return {
//     props: { feed },
//   };
// };

type Props = {
  feed: PostProps[];
};
const Index = () => {
  const { user, session } = Auth.useUser()
  const { data, error } = useSWR(
    session ? ['/api/getUser', session.access_token] : null,
    fetcher
  )
  const [authView, setAuthView] = useState('sign_in')

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY') setAuthView('update_password')
        if (event === 'USER_UPDATED')
          setTimeout(() => setAuthView('sign_in'), 1000)
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch('/api/auth', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          credentials: 'same-origin',
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json())
      }
    )

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  const View = () => {
    if (!user)
      return (
        <Space direction="vertical" size={8}>
          <div>
            <img
              src="https://app.supabase.io/img/supabase-dark.svg"
              width="96"
            />
            <Typography.Title level={3}>
              Welcome to Supabase Auth
            </Typography.Title>
          </div>
          <Auth
            supabaseClient={supabase}
            view={authView}
          />
        </Space>
      )

    return (
      <Space direction="vertical" size={6}>
        {authView === 'update_password' && (
          <Auth.UpdatePassword supabaseClient={supabase} />
        )}
        {user && (
          <>
            <Typography.Text>You're signed in</Typography.Text>
            <Typography.Text strong>Email: {user.email}</Typography.Text>

            <Button
              icon={<Icon type="LogOut" />}
              type="outline"
              onClick={() => supabase.auth.signOut()}
            >
              Log out
            </Button>
            {error && (
              <Typography.Text danger>Failed to fetch user!</Typography.Text>
            )}
            {data && !error ? (
              <>
                <Typography.Text type="success">
                  User data retrieved server-side (in API route):
                </Typography.Text>

                <Typography.Text>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </Typography.Text>
              </>
            ) : (
              <div>Loading...</div>
            )}

            <Typography.Text>
              <Link href="/profile">
                <a>SSR example with getServerSideProps</a>
              </Link>
            </Typography.Text>
          </>
        )}
      </Space>
    )
  }

  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <Card>
        <View />
      </Card>
    </div>
  )
}

export default Index

// const Blog: React.FC<Props> = (props) => {
//     const { user, session } = Auth.useUser()
//   const { data, error } = useSWR(
//     session ? ['/api/getUser', session.access_token] : null,
//     fetcher
//   )
//   const [authView, setAuthView] = useState('sign_in')

//   useEffect(() => {
//     const { data: authListener } = supabase.auth.onAuthStateChange(
//       (event, session) => {
//         if (event === 'PASSWORD_RECOVERY') setAuthView('update_password')
//         if (event === 'USER_UPDATED')
//           setTimeout(() => setAuthView('sign_in'), 1000)
//         // Send session to /api/auth route to set the auth cookie.
//         // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
//         fetch('/api/auth', {
//           method: 'POST',
//           headers: new Headers({ 'Content-Type': 'application/json' }),
//           credentials: 'same-origin',
//           body: JSON.stringify({ event, session }),
//         }).then((res) => res.json())
//       }
//     )

//     return () => {
//       authListener.unsubscribe()
//     }
//   }, [])

//       if (!user)
//       return (
//         <Space direction="vertical" size={8}>
//           <div>
//             <img
//               src="https://app.supabase.io/img/supabase-dark.svg"
//               width="96"
//             />
//             <Typography.Title level={3}>
//               Welcome to Supabase Auth
//             </Typography.Title>
//           </div>
//           <Auth
//             supabaseClient={supabase}
//             view={authView}
//           />
//         </Space>
//       )
//   return (
//     <Layout>
//       <div className="page">
//         <h1>Public Feed</h1>
//         <main>
//           {props.feed.map((post) => (
//             <div key={post.id} className="post">
//               <Post post={post} />
//             </div>
//           ))}
//         </main>
//       </div>
//       <style jsx>{`
//         .post {
//           background: white;
//           transition: box-shadow 0.1s ease-in;
//         }

//         .post:hover {
//           box-shadow: 1px 1px 3px #aaa;
//         }

//         .post + .post {
//           margin-top: 2rem;
//         }
//       `}</style>
//     </Layout>
//   );
// };

// export default Blog;
