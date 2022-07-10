import { Stack, Button, Show, useDisclosure } from '@chakra-ui/react';
import AuthModal from '@components/Auth/AuthModal';

export const LoginButtons = () => {
  const { onOpen, onClose, isOpen } = useDisclosure({
    id: 'login-modal',
  });
  return (
    <>
      <AuthModal onClose={onClose} isOpen={isOpen} viewType={'sign_in'} />
      <Stack
        flex={{ base: 1, md: 0 }}
        justify={'flex-end'}
        direction={'row'}
        spacing={6}>
        <Show above='sm'>
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            variant={'link'}
            onClick={onOpen}>
            Sign In
          </Button>
        </Show>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'pink.400'}
          _hover={{
            bg: 'pink.300',
          }}
          onClick={onOpen}>
          Sign Up
        </Button>
      </Stack>
    </>
  );
};
