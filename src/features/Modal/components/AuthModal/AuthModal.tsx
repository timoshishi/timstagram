import Auth from './Auth';
import { supabase } from '@src/lib/initSupabase';
import { ModalContent, Flex, Text, ModalCloseButton, ModalOverlay } from '@chakra-ui/react';
import { BrandLogo } from '@common/components/BrandLogo';
import { useAuthModal } from '@features/Modal';
import { SignUpActionType } from './AuthHeader';
import { ViewType } from './Auth';

export interface AuthModalProps {
  viewType: ViewType;
  signUpActionType?: SignUpActionType;
}
export const AuthModal = () => {
  const {
    componentProps: { viewType, signUpActionType },
  } = useAuthModal();

  return (
    <>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalCloseButton />
        <Flex flexDirection='column' p={6}>
          <Auth supabaseClient={supabase} view={viewType} redirectTo='/feed' signUpActionType={signUpActionType} />
        </Flex>
      </ModalContent>
    </>
  );
};
