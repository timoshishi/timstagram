import Auth from './Auth';
import { supabase } from '@src/lib/initSupabase';
import { ModalContent, Flex, ModalCloseButton, ModalOverlay } from '@chakra-ui/react';
import { useAuthModal } from '@features/AuthModal';

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
