import { Auth } from '@supabase/ui';
import { supabase } from '../../../lib/initSupabase';
import { ViewType } from 'types/auth.types';
import {
  UseDisclosureReturn,
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Text,
  Button,
  Box,
} from '@chakra-ui/react';
import { BrandLogo } from '@common/layout/app-layout/Navbar/BrandLogo';
interface AuthModalProps {
  isOpen: UseDisclosureReturn['isOpen'];
  onClose: UseDisclosureReturn['onClose'];
  viewType: ViewType;
}
const AuthModal = ({ isOpen, onClose, viewType }: AuthModalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} size='lg'>
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
    </Modal>
  );
};

export default AuthModal;
