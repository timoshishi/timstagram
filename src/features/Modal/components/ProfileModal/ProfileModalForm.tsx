import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Textarea,
  Avatar,
  Text,
  Flex,
  ModalCloseButton,
} from '@chakra-ui/react';
import { BrandLogo } from '@src/common/components/BrandLogo';
import { PostHeaderAvatar } from '@common/components/PostHeaderAvatar';
import { ProfileModalProps } from './ProfileModal';

interface ProfileModalFormProps {
  initialProfileData: ProfileModalProps['initialProfileData'];
  profile: Required<ProfileModalFormProps['initialProfileData']>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteUser: () => void;
}
export const ProfileModalForm = ({ initialProfileData, profile, handleSubmit }: ProfileModalFormProps) => {
  return (
    <Box>
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
    </Box>
  );
};
