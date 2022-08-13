import { Box, Flex, Show, useColorModeValue } from '@chakra-ui/react';
import { BrandLogo } from '../../../components/BrandLogo';
import { ProfileDropdown } from './ProfileDropdown';
import { LoginButtons } from './LoginButtons';
import { NavbarLinks } from './NavbarLinks';
import { useUser } from '@supabase/auth-helpers-react';
import { useAuthModal } from '@features/Modal';
import { ViewType } from 'types/auth.types';

export const Navbar = () => {
  const { user, isLoading } = useUser();
  const { showAuthModal, isOpen, hideModal } = useAuthModal();

  if (isOpen && user) {
    hideModal();
  }
  const handleAuthModal = (viewType: ViewType) => {
    showAuthModal( { viewType });
  };

  const colorMode = useColorModeValue('gray.100', 'gray.900');
  if (isLoading) {
    return <div>isLoading...</div>;
  }
  return (
    <Box minW='100vw' maxW='100vw' position='fixed' top={0} left={0} zIndex={1} bg={colorMode} as='nav' id='navbar'>
      <Show above='lg'>
        <Box width={'50%'} />
      </Show>
      <Box bg={colorMode} px={4} minW='1/2' maxW='100%'>
        <Flex h={16} alignItems='center' justifyContent={['space-between', 'flex-end']} minWidth='max-content'>
          <Show above='xs'>
            <BrandLogo />
          </Show>
          <NavbarLinks />
          {!!user && !isLoading ? <ProfileDropdown /> : <LoginButtons handleLogin={handleAuthModal} />}
        </Flex>
      </Box>
    </Box>
  );
};
