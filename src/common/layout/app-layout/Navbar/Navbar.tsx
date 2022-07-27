import {
  Box,
  Flex,
  Show,
  useColorModeValue,
  Container,
} from '@chakra-ui/react';
import { BrandLogo } from './BrandLogo';
import { ProfileDropdown } from './ProfileDropdown';
import { LoginButtons } from './LoginButtons';
import { NavbarLinks } from './NavbarLinks';
import { useUser } from '@supabase/auth-helpers-react';
export const Navbar = () => {
  const { user, isLoading } = useUser();
  const colorMode = useColorModeValue('gray.100', 'gray.900');
  if (isLoading) {
    return <div>isLoading...</div>;
  }
  return (
    <Box
      w='full'
      minW='full'
      position='fixed'
      top={0}
      left={0}
      zIndex={1}
      bg={colorMode}
      as='nav'
      id='navbar'>
      <Show above='lg'>
        <Box width={'50%'} />
      </Show>
      <Box bg={colorMode} px={4} minW='1/2'>
        <Flex
          h={16}
          alignItems='center'
          justifyContent={['space-between', 'flex-end']}
          minWidth='max-content'>
          <BrandLogo />
          <NavbarLinks />
          {!!user && !isLoading ? <ProfileDropdown /> : <LoginButtons />}
        </Flex>
      </Box>
    </Box>
  );
};
