import React, { useState } from 'react';
import type { SupabaseClient, Provider } from '@supabase/supabase-js';
import { Input, Button, Space, Typography, IconMail, IconInbox } from '@supabase/ui';
import { ModalToasts } from '@features/Modal/hooks/useModalToasts';
import { ViewType, RedirectTo } from '../../types';
import { VIEWS } from '../../constants';

export interface Props {
  supabaseClient: SupabaseClient;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  socialLayout?: 'horizontal' | 'vertical';
  socialColors?: boolean;
  socialButtonSize?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  providers?: Provider[];
  verticalSocialLayout?: any;
  view?: ViewType;
  redirectTo?: RedirectTo;
  onlyThirdPartyProviders?: boolean;
  magicLink?: boolean;
}

export function ForgottenPassword({
  setAuthView,
  supabaseClient,
  redirectTo,
  useModalToast,
}: {
  setAuthView: any;
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
  useModalToast: ModalToasts;
}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabaseClient.auth.api.resetPasswordForEmail(email, { redirectTo });
      if (error) {
        throw new Error(JSON.stringify(error));
      } else {
        useModalToast.info({
          title: "We've sent you an email",
          message: 'Check your email for the password reset link',
        });
      }
    } catch (error) {
      useModalToast.error({
        title: 'Error',
        message: 'Sorry something seems to have gone wrong.',
        error: error,
      });
    }
    setLoading(false);
  };

  return (
    <form id='auth-forgot-password' onSubmit={handlePasswordReset}>
      <Space size={4} direction={'vertical'}>
        <Space size={3} direction={'vertical'}>
          <Input
            label='Email address'
            placeholder='Your email address'
            icon={<IconMail size={21} stroke={'#666666'} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            type='email'
          />
          <Button block size='large' htmlType='submit' icon={<IconInbox size={21} />} loading={loading}>
            Send reset password instructions
          </Button>
        </Space>
        <Typography.Link
          href='#auth-sign-in'
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setAuthView(VIEWS.SIGN_IN);
          }}
        >
          Go back to sign in
        </Typography.Link>
      </Space>
    </form>
  );
}
