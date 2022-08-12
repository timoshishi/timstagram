import { Auth } from '@supabase/ui';
// import { supabase } from '@src/lib/initSupabase';
// import Auth from './SignupForm';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';

import { ModalContent, Flex, Text, Box, ModalCloseButton, ModalOverlay } from '@chakra-ui/react';
import { BrandLogo } from '@common/components/BrandLogo';
import { useGlobalModalContext } from '../Modal/GlobalModal';
import { ViewType } from 'types/auth.types';
export interface AuthModalProps {
  viewType: ViewType;
}
const AuthModal = () => {
  const {
    store: {
      componentProps: { viewType },
    },
  } = useGlobalModalContext<AuthModalProps>();

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
          <Auth supabaseClient={supabaseClient} view={viewType} />
        </Flex>
      </ModalContent>
    </>
  );
};

export default AuthModal;
