import { ViewsMap } from '../types';

export const VIEWS: ViewsMap = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: 'update_password',
};

export const SIGN_UP_TEXTS = {
  LIKE: 'Sign up to show other users you like their content!',
  SAVE: 'Sign up to save your favorite content!',
  COMMENT: 'Sign up to comment on posts!',
  FOLLOW: 'Sign up to follow other users!',
  POST: 'Sign up to post your own content!',
  DEFAULT: 'Sign up to get started!',
} as const;

export const HEADER_TEXTS = {
  forgotten_password: "Let's get you a new password",
  sign_in: 'Welcome back!',
  update_password: 'Update your password',
  magic_link: 'Sign in with magic link',
} as const;
