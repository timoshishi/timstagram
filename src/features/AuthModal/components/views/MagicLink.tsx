import React, { useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { Input, Button, Space, Typography, IconMail, IconInbox } from '@supabase/ui';
import { RedirectTo } from '../../types';
import { VIEWS } from '../../constants';

export function MagicLink({
  setAuthView,
  supabaseClient,
  redirectTo,
}: {
  setAuthView: any;
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
}) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMagicLinkSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
    const { error } = await supabaseClient.auth.signIn({ email }, { redirectTo });
    if (error) setError(error.message);
    else setMessage('Check your email for the magic link');
    setLoading(false);
  };

  return (
    <form id='auth-magic-link' onSubmit={handleMagicLinkSignIn}>
      <Space size={4} direction={'vertical'}>
        <Space size={3} direction={'vertical'}>
          <Input
            label='Email address'
            placeholder='Your email address'
            icon={<IconMail size={21} stroke={'#666666'} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
          <Button block size='large' htmlType='submit' icon={<IconInbox size={21} />} loading={loading}>
            Send magic link
          </Button>
        </Space>
        <Typography.Link
          href='#auth-sign-in'
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setAuthView(VIEWS.SIGN_IN);
          }}
        >
          Sign in with password
        </Typography.Link>
        {message && <Typography.Text>{message}</Typography.Text>}
        {error && <Typography.Text type='danger'>{error}</Typography.Text>}
      </Space>
    </form>
  );
}
