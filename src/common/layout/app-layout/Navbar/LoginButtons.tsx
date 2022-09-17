import { Stack, Button, Show } from '@chakra-ui/react';
import { AuthTypes } from '@features/AuthModal';
import { useAuthModal } from '@features/AuthModal';

export const LoginButtons = () => {
  const { showAuthModal } = useAuthModal();

  const handleLogin = (viewType: AuthTypes.ViewType) => {
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
            color={'blackAlpha.700'}
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
          variant={'solid'}
          colorScheme='telegram'
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
