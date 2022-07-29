import { Auth } from '@supabase/ui';
import { supabase } from '../../../lib/initSupabase';
import {
  ModalContent,
  Flex,
  Text,
  Box,
  ModalCloseButton,
  ModalOverlay,
} from '@chakra-ui/react';
import { BrandLogo } from '@common/layout/app-layout/Navbar/BrandLogo';
import { AuthModalProps, useGlobalModalContext } from '../Modal/GlobalModal';

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
            <Text fontSize='xl'>
              Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
            </Text>
          </Box>
          <Auth supabaseClient={supabase} view={viewType} />
        </Flex>
      </ModalContent>
    </>
  );
};

export default AuthModal;
