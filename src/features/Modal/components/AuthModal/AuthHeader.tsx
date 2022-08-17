import { Flex, Text } from '@chakra-ui/react';
import { BrandLogo } from '@common/components/BrandLogo';
import { ViewType } from '../AuthModal/Auth';

export type SignUpActionType = keyof typeof SIGN_UP_TEXTS;

export type SignUpActionTypeText = typeof SIGN_UP_TEXTS[SignUpActionType];

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
};

export const AuthHeader = ({
  signUpActionType,
  viewType,
}: {
  signUpActionType?: SignUpActionType;
  viewType: ViewType;
}) => {
  const signUpActionTypeText = signUpActionType ? SIGN_UP_TEXTS[signUpActionType] : SIGN_UP_TEXTS.DEFAULT;
  const authHeaderText = viewType === 'sign_up' ? signUpActionTypeText : HEADER_TEXTS[viewType];
  return (
    <Flex
      direction='column'
      align='center'
      justify='center'
      p='0'
      bg='gray.50'
      borderBottom='1px solid'
      borderColor='gray.200'
    >
      <BrandLogo />
      <Text mt='4' fontSize='xl' fontWeight='bold'>
        {authHeaderText}
      </Text>
    </Flex>
  );
};
