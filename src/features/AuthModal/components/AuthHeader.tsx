import { Flex, Text } from '@chakra-ui/react';
import { BrandLogo } from '@common/components/BrandLogo';
import { ViewType } from '../types';
import { SIGN_UP_TEXTS, HEADER_TEXTS } from '../constants';
import { SignUpActionType } from '../types';

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
