import { SIGN_UP_TEXTS } from '../constants';

export type ViewType = 'sign_in' | 'sign_up' | 'forgotten_password' | 'magic_link' | 'update_password';

export interface ViewsMap {
  [key: string]: ViewType;
}

export type RedirectTo = undefined | string;

export type SignUpActionType = keyof typeof SIGN_UP_TEXTS;

export type SignUpActionTypeText = typeof SIGN_UP_TEXTS[SignUpActionType];

export interface AuthModalProps {
  viewType: ViewType;
  signUpActionType?: SignUpActionType;
}
