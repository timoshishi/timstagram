import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import {
  ModalContent,
  Flex,
  Text,
  ModalCloseButton,
  ModalOverlay,
  Input,
  FormControl,
  FormLabel,
  Button,
  Textarea,
  FormHelperText,
  Avatar,
} from '@chakra-ui/react';

import { BrandLogo } from '@src/common/components/BrandLogo';
import { useGlobalModalContext } from '@src/common/components/Modal/GlobalModal';
import { PostHeaderAvatar } from '@common/components/PostCard/PostHeader/PostHeaderAvatar';
import { useProfileModal } from '../hooks/useProfileModal';

export interface ProfileModalProps {
  initialProfileData: {
    username?: string;
    description?: string;
    avatarUrl?: string;
    userId: string;
    email: string;
  };
}

export const ProfileModal = () => {
  const { getComponentProps } = useProfileModal();
  const { initialProfileData } = getComponentProps();
  const profile = Object.assign(
    {
      username: '',
      description: '',
      avatarUrl: '',
    },
    initialProfileData
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullFormData = new FormData(e.target as HTMLFormElement);

    const dataParsed = Object.fromEntries(fullFormData.entries());
    console.log(dataParsed);
    e.preventDefault();
  };
  const deleteUser = async () => {
    const { data, error } = await supabaseClient.from('profiles').delete().match({ userId: initialProfileData.userId });
    const { data: data2, error: error2 } = await supabaseClient
      .from('auth.users')
      .delete()
      .match({ id: initialProfileData.userId });
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
    if (error2) {
      console.log(error2);
    } else {
      console.log(data2);
    }
  };
  return (
    <>
      <ModalOverlay />
      <ModalContent p={6}>
        {initialProfileData.username && <ModalCloseButton />}
        <Flex flexDirection='column' gap='4'>
          <Flex alignItems='center'>
            <BrandLogo />
            {!initialProfileData.username && (
              <Text fontSize='xl' as='h2'>
                Let's set up your profile!
              </Text>
            )}
          </Flex>
          <Flex justifyContent='center'>
            {initialProfileData.username && (
              <PostHeaderAvatar username={initialProfileData.username} avatarUrl={initialProfileData.avatarUrl || ''} />
            )}
          </Flex>
          <form onSubmit={handleSubmit}>
            <Flex flexDirection='column' gap='4'>
              <FormControl isRequired={!initialProfileData.username}>
                {!initialProfileData.username && <FormLabel htmlFor='username'>Choose your username</FormLabel>}
                <Input
                  type='text'
                  name='username'
                  id='username'
                  defaultValue={profile.username}
                  pattern='^[a-zA-Z]{1,}[a-zA-Z0-9_]{0,}$'
                  minLength={4}
                  maxLength={20}
                  title='Username must start with a letter and only contain letters and numbers'
                  variant={initialProfileData.username ? 'flushed' : 'outline'}
                  isDisabled={!!initialProfileData.username}
                />
                <FormHelperText>
                  {initialProfileData.username
                    ? 'You can change your username by deleting your account and creating a new one'
                    : 'Username must be at least 4 characters and contain only letters, numbers, and underscores'}
                </FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='description'>About Me</FormLabel>
                <Textarea name='description' id='description' defaultValue={profile.description} maxLength={140} />
                <FormHelperText>Let others know a little more about #you</FormHelperText>
              </FormControl>
              <FormControl>
                <Flex alignItems='center' gap='4'>
                  <Avatar name={profile.username} src={profile.avatarUrl} size='sm' />
                  <Button colorScheme={profile.avatarUrl ? 'whatsapp' : 'twitter'} variant='outline' size='sm'>
                    {profile.avatarUrl ? 'Update your avatar' : 'Add an avatar'}
                  </Button>
                </Flex>
              </FormControl>
              <Button type='submit' my='2'>
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
      </ModalContent>
    </>
  );
};
