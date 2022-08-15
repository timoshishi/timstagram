import Auth from './Auth';
import { supabase } from '@src/lib/initSupabase';
import { ModalContent, Flex, Text, Box, ModalCloseButton, ModalOverlay } from '@chakra-ui/react';
import { BrandLogo } from '@common/components/BrandLogo';
import { ViewType } from 'types/auth.types';
import { useAuthModal } from '@features/Modal';

export interface AuthModalProps {
  viewType: ViewType;
}
export const AuthModal = () => {
  const {
    componentProps: { viewType },
  } = useAuthModal();

  return (
    <>
      <ModalOverlay />
      <ModalContent p={4}>
        <ModalCloseButton />
        <Flex flexDirection='column' p={6}>
          <Box m={25}>
            <BrandLogo />
            <Text fontSize='xl'>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</Text>
          </Box>
          <Auth supabaseClient={supabase} view={viewType} redirectTo='/feed' />
        </Flex>
      </ModalContent>
    </>
  );
};
