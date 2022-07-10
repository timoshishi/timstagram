import { Stack, Button, Show } from '@chakra-ui/react';
export const LoginButtons = () => {
  return (
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
          href={'#'}>
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
        }}>
        Sign Up
      </Button>
    </Stack>
  );
};
