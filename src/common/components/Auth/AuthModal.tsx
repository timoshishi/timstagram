import { Auth } from '@supabase/ui';
import { supabase } from '../../../lib/initSupabase';
import { ViewType } from 'types/auth.types';
import {
  UseDisclosureReturn,
  // Modal,console.log('RENDERING', viewType);
  ModalOverlay,
  ModalContent,
  Flex,
  Text,
  Button,
  Box,
} from '@chakra-ui/react';
import { BrandLogo } from '@common/layout/app-layout/Navbar/BrandLogo';
import { AuthModalProps, useGlobalModalContext } from '../Modal/ModalContext';

const AuthModal = () => {
  const {
    store: {
      modalProps: { viewType },
    },
  } = useGlobalModalContext<AuthModalProps>();
  return (
    <>
      <ModalOverlay />
      <ModalContent p={4}>
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
