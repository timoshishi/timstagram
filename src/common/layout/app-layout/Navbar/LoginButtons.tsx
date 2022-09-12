import { Stack, Button, Show } from '@chakra-ui/react';
import { ViewType } from 'types/auth.types';
import { useAuthModal } from '@features/Modal';

export const LoginButtons = () => {
  const { showAuthModal } = useAuthModal();

  const handleLogin = (viewType: ViewType) => {
    showAuthModal({ viewType });
  };

  return (
    <>
      <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
        <Show above='sm'>
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={400}
            name='signin'
            variant={'link'}
            onClick={() => handleLogin('sign_in')}
          >
            Sign In
          </Button>
        </Show>
        <Button
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'pink.400'}
          _hover={{
            bg: 'pink.300',
          }}
          name='signup'
          onClick={() => handleLogin('sign_up')}
        >
          Sign Up
        </Button>
      </Stack>
    </>
  );
};
