import { Auth, Typography, Space, Button } from '@supabase/ui';
import { supabase } from '../../../lib/initSupabase';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { ViewType } from 'types/authtypes';
import {
  UseDisclosureReturn,
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
} from '@chakra-ui/react';
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
          <div>
            <Image
              src='/images/flow.svg'
              width='96'
              height='96'
              alt='supabase'
            />
            <Typography.Title level={3}>
              Welcome to Supabase Auth
            </Typography.Title>
          </div>
          <Button onClick={supabaseClient.auth.signOut}>Signout</Button>
          <Auth supabaseClient={supabase} view={viewType} />
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default AuthModal;
