import React, { useEffect, useState } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import { EmailAuth, ForgottenPassword, UpdatePassword } from './views';
import { Space } from '@supabase/ui';
import AuthStyles from './Auth.module.css';
import { useAuthModal } from '../hooks';
import { useUser } from '@common/hooks/useUser';
import { AuthHeader } from './AuthHeader';
import type { SignUpActionType, ViewType, RedirectTo } from '../types';
import { VIEWS } from '../constants';

export interface Props {
  supabaseClient: SupabaseClient;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  view?: ViewType;
  redirectTo?: RedirectTo;
  onlyThirdPartyProviders?: boolean;
  signUpActionType?: SignUpActionType | undefined;
}

function Auth({
  supabaseClient,
  className,
  style,
  view = 'sign_in',
  redirectTo,
  onlyThirdPartyProviders = false,
  signUpActionType,
}: Props): JSX.Element | null {
  const [authView, setAuthView] = useState(view);
  const [defaultEmail, setDefaultEmail] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('');
  const { hideModal, useModalToast } = useAuthModal();
  const { user } = useUser();

  let containerClasses = [AuthStyles['sbui-auth']];
  if (className) {
    containerClasses.push(className);
  }

  const Container = (props: any) => (
    <div className={containerClasses.join(' ')} style={style}>
      <AuthHeader viewType={authView} signUpActionType={signUpActionType} />
      <Space size={8} direction={'vertical'}>
        {!onlyThirdPartyProviders && props.children}
      </Space>
    </div>
  );

  useEffect(() => {
    // handle view override
    setAuthView(view);
  }, [view]);

  switch (authView) {
    case VIEWS.SIGN_IN:
    case VIEWS.SIGN_UP:
      return (
        <Container>
          <EmailAuth
            id={authView === VIEWS.SIGN_UP ? 'auth-sign-up' : 'auth-sign-in'}
            supabaseClient={supabaseClient}
            authView={authView}
            setAuthView={setAuthView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={redirectTo}
            user={user}
            hideModal={hideModal}
            useModalToast={useModalToast}
          />
        </Container>
      );
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Container>
          <ForgottenPassword
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            useModalToast={useModalToast}
          />
        </Container>
      );
    case VIEWS.UPDATE_PASSWORD:
      return (
        <Container>
          <UpdatePassword supabaseClient={supabaseClient} />
        </Container>
      );
    default:
      return null;
  }
}

Auth.ForgottenPassword = ForgottenPassword;
Auth.UpdatePassword = UpdatePassword;

export default Auth;
