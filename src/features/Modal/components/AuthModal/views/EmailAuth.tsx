import React, { useEffect, useRef, useState } from 'react';
import type { SupabaseClient, ApiError, User } from '@supabase/supabase-js';
import { Input, Checkbox, Button, Space, Typography, IconKey, IconMail, IconLock } from '@supabase/ui';
import { FiUser } from 'react-icons/fi';
import { msLeftUntilSubmission, usernameDoesExist } from '@features/Modal/api/auth-api';
import { insertInitialProfileData } from '@features/Modal/api/profile-api';
const VIEWS: ViewsMap = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
};

const ERRORS = {
  USERNAME_TAKEN: 'Username taken, please try another',
  TIME_ERROR: 'For security purposes, you can only request this after',
  DEFAULT_ERROR: 'Something went wrong, please try again',
};

interface ViewsMap {
  [key: string]: ViewType;
}

type ViewType = 'sign_in' | 'sign_up' | 'forgotten_password' | 'magic_link' | 'update_password';

type RedirectTo = undefined | string;

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
  magicLink,
  user,
  hideModal,
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
  magicLink?: boolean;
  user: User | null;
  hideModal: () => void;
}) {
  const isMounted = useRef<boolean>(true);
  // const [email, setEmail] = useState(defaultEmail);
  // const [password, setPassword] = useState(defaultPassword);
  const [email, setEmail] = useState('timfrrst@gmail.com');
  const [password, setPassword] = useState('password');
  const [username, setUsername] = useState('bobo');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  function handleError(error: ApiError): void {
    console.error(error);
    if (error.status === 500) {
      setError(ERRORS.DEFAULT_ERROR);
      return;
    }
    setError(error.message);
    return;
  }

  useEffect(() => {
    setEmail(defaultEmail);
    setPassword(defaultPassword);

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authView]);

  useEffect(() => {
    let timeout: NodeJS.Timeout = setTimeout(() => {}, 0);
    if (error.includes(ERRORS.TIME_ERROR)) {
      const secondsToWait = msLeftUntilSubmission(error);
      timeout = setTimeout(() => {
        setError('');
        setLoading(false);
      }, secondsToWait);
    } else if (error) {
      timeout = setTimeout(() => {
        setError('');
      }, 5000);
      setLoading(false);
    }

    error && setLoading(false);
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
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
            handleError(signInError);
            console.error(signInError);
            return;
          }
          if (user) hideModal();
          break;
        case 'sign_up':
          if (await usernameDoesExist(username)) {
            setError(ERRORS.USERNAME_TAKEN);
            setLoading(false);
            break;
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
            handleError(signUpError);
            return;
          }

          if (signUpUser) {
            const resp = await insertInitialProfileData({ id: signUpUser.id, username });
          }

          if (signUpUser && !signUpSession) setMessage('Check your email for the confirmation link.');
          break;
      }

      /*
       * it is possible the auth component may have been unmounted at this point
       * check if component is mounted before setting a useState
       */
      if (isMounted.current) setLoading(false);
    } catch (handleError) {}
  };

  const handleViewChange = (newView: ViewType) => {
    setDefaultEmail(email);
    setDefaultPassword(password);
    setAuthView(newView);
  };

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
                if (error === ERRORS.USERNAME_TAKEN) setError('');
                setUsername(e.target.value);
              }}
              required
              pattern='^[a-zA-Z]{1,}[a-zA-Z0-9_]{0,}$'
              minLength={4}
              maxLength={20}
              title='Username must start with a letter and only contain letters and numbers'
              error={error === ERRORS.USERNAME_TAKEN ? '' : undefined}
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
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
          {authView === VIEWS.SIGN_IN && magicLink && (
            <Typography.Link
              href='#auth-magic-link'
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setAuthView(VIEWS.MAGIC_LINK);
              }}
            >
              Sign in with magic link
            </Typography.Link>
          )}
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
          {error && <Typography.Text type='danger'>{error}</Typography.Text>}
          {message && <Typography.Text type='secondary'>{message}</Typography.Text>}
        </Space>
      </Space>
    </form>
  );
}
export { EmailAuth };
