import React, { useEffect, useRef, useState } from 'react';
import type { SupabaseClient, ApiError, User } from '@supabase/supabase-js';
import { Input, Checkbox, Button, Space, Typography, IconKey, IconMail, IconLock } from '@supabase/ui';
import { FiUser } from 'react-icons/fi';
import { usernameDoesExist } from '../../api/auth-api';
import { insertInitialProfileData } from '../../api/auth-api';
import { ModalToasts } from '@features/Modal/hooks/useModalToasts';
import { ViewType, RedirectTo } from '../../types';
import { VIEWS } from '../../constants';

const ERRORS = {
  USERNAME_TAKEN: 'Username taken, please try another',
  TIME_ERROR: 'For security purposes, you can only request this after',
  DEFAULT_ERROR: 'Something went wrong, please try again',
};

function EmailAuth({
  authView,
  defaultEmail,
  defaultPassword,
  id,
  setAuthView,
  setDefaultEmail,
  setDefaultPassword,
  supabaseClient,
  redirectTo,
  hideModal,
  useModalToast,
}: {
  authView: ViewType;
  defaultEmail: string;
  defaultPassword: string;
  id: 'auth-sign-up' | 'auth-sign-in';
  setAuthView: any;
  setDefaultEmail: (email: string) => void;
  setDefaultPassword: (password: string) => void;
  supabaseClient: SupabaseClient;
  redirectTo?: RedirectTo;
  user: User | null;
  hideModal: () => void;
  useModalToast: ModalToasts;
}) {
  const isMounted = useRef<boolean>(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmail = (val: string): void => {
    setEmail(val.toLowerCase().trim());
  };

  function handleErrorMessage(error: ApiError): string {
    if (error?.status === 500) {
      return ERRORS.DEFAULT_ERROR;
    }
    return error?.message;
  }

  useEffect(() => {
    setEmail(defaultEmail);
    setPassword(defaultPassword);

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authView]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      switch (authView) {
        case 'sign_in':
          const { error: signInError, user } = await supabaseClient.auth.signIn(
            {
              email,
              password,
            },
            { redirectTo }
          );
          if (signInError) {
            useModalToast.error({
              message: handleErrorMessage(signInError),
              error: signInError,
            });
            setLoading(false);
          }
          if (user) hideModal();
          break;

        case 'sign_up':
          if (await usernameDoesExist(username)) {
            useModalToast.warning({
              title: 'Sorry about that',
              message: ERRORS.USERNAME_TAKEN,
            });
            setLoading(false);
            return;
          }

          const {
            user: signUpUser,
            session: signUpSession,
            error: signUpError,
          } = await supabaseClient.auth.signUp(
            {
              email,
              password,
            },
            { redirectTo }
          );

          if (signUpError) {
            useModalToast.error({
              message: 'Something went wrong, please try again',
              error: signUpError,
            });
          }

          if (signUpUser) {
            await insertInitialProfileData({ id: signUpUser.id, username });
            useModalToast.info({
              title: `Welcome to ${process.env.NEXT_PUBLIC_APP_NAME}!`,
              message: "We've sent you an email with a link to confirm your account",
            });
          }
          break;
      }

      /*
       * it is possible the auth component may have been unmounted at this point
       * check if component is mounted before setting a useState
       */
      if (isMounted.current) setLoading(false);
    } catch (error: unknown) {
      useModalToast.error({
        message: handleErrorMessage(error as ApiError),
        error,
      });
      setLoading(false);
    }
  };

  const handleViewChange = (newView: ViewType) => {
    setDefaultEmail(email);
    setDefaultPassword(password);
    setAuthView(newView);
  };

  //TODO: Add password complexity requirements
  return (
    <form id={id} onSubmit={handleSubmit}>
      <Space size={6} direction={'vertical'}>
        <Space size={3} direction={'vertical'}>
          {authView === 'sign_up' && (
            <Input
              type='text'
              label='Username'
              name='username'
              autoComplete='username'
              data-testid='username'
              value={username}
              icon={<FiUser size={21} stroke={'#666666'} strokeWidth='1px' />}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
              pattern='^[a-zA-Z]{1,}[a-zA-Z0-9_]{0,}$'
              minLength={4}
              maxLength={20}
              title='Username must start with a letter and only contain letters and numbers'
            />
          )}
          <Input
            label='Email address'
            name='email'
            autoComplete='email'
            data-testid='email'
            defaultValue={email}
            // required
            icon={<IconMail size={21} stroke={'#666666'} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmail(e.target.value)}
          />
          <Input
            label='Password'
            type='password'
            name='password'
            data-testid='password'
            defaultValue={password}
            required
            autoComplete='current-password'
            // minLength={8}
            icon={<IconKey size={21} stroke={'#666666'} />}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          />
        </Space>
        <Space direction='vertical' size={6}>
          <Space style={{ justifyContent: 'space-between' }}>
            <Checkbox
              label='Remember me'
              name='remember_me'
              data-testid='remember_me'
              onChange={(value: React.ChangeEvent<HTMLInputElement>) => setRememberMe(value.target.checked)}
            />
            {authView === VIEWS.SIGN_IN && (
              <Typography.Link
                href='#auth-forgot-password'
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  setAuthView(VIEWS.FORGOTTEN_PASSWORD);
                }}
              >
                Forgot your password?
              </Typography.Link>
            )}
          </Space>
          <Button htmlType='submit' type='primary' size='large' icon={<IconLock size={21} />} loading={loading} block>
            {authView === VIEWS.SIGN_IN ? 'Sign in' : 'Sign up'}
          </Button>
        </Space>
        <Space direction='vertical' style={{ textAlign: 'center' }}>
          {authView === VIEWS.SIGN_IN ? (
            <Typography.Link
              href='#auth-sign-up'
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleViewChange(VIEWS.SIGN_UP);
              }}
            >
              Don't have an account? Sign up
            </Typography.Link>
          ) : (
            <Typography.Link
              href='#auth-sign-in'
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                handleViewChange(VIEWS.SIGN_IN);
              }}
            >
              Do you have an account? Sign in
            </Typography.Link>
          )}
        </Space>
      </Space>
    </form>
  );
}

export { EmailAuth };
