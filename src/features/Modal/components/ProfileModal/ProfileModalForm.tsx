import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Textarea,
  Text,
  Flex,
  ModalCloseButton,
  FormErrorMessage,
  useBoolean,
  AvatarBadge,
} from '@chakra-ui/react';
import { BrandLogo } from '@src/common/components/BrandLogo';
import { PostHeaderAvatar } from '@common/components/PostHeaderAvatar';
import { ProfileModalProps } from './ProfileModal';
import { updateProfile } from '@features/Modal/api/profile-api';
import React, { FormEventHandler, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';

interface ProfileModalFormProps {
  initialProfileData: ProfileModalProps['initialProfileData'];
  profile: Required<ProfileModalFormProps['initialProfileData']>;
  deleteUser: () => void;
  getButtonProps: () => any;
  getDisclosureProps: () => any;
  avatarUrl: string;
}
export const ProfileModalForm = ({
  initialProfileData,
  profile,
  getButtonProps,
  getDisclosureProps,
  avatarUrl,
}: ProfileModalFormProps) => {
  const [bio, setBio] = useState(profile.bio);
  const [err, setErr] = useState('');
  const [isEditingBio, { toggle: toggleEditingBio }] = useBoolean();
  const [isSubmitting, { toggle: toggleIsSubmitting }] = useBoolean();

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    if (e.target.value.length >= 140) {
      setBio(e.target.value.slice(0, 140));
      setErr('Bio must be 140 characters or less');
    } else if (err && e.target.value.length < 140) {
      setErr('');
    }
  };
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!isEditingBio) {
      toggleEditingBio();
      return;
    }
    try {
      console.log('submitting');
      toggleIsSubmitting();
      await updateProfile({
        bio,
      });
      toggleEditingBio();
    } catch (error) {
      console.error(error);
    }
    toggleIsSubmitting();
  };

  return (
    <Box {...getDisclosureProps()}>
      {initialProfileData.username && <ModalCloseButton />}
      <Flex flexDirection='column' gap='4'>
        <Flex alignItems='center' justifyContent='center'>
          <BrandLogo />
        </Flex>
        <Flex>
          {initialProfileData.username && (
            <Flex alignItems='center' justifyContent='space-between'>
              <Box flexGrow={1} {...getButtonProps()}>
                <PostHeaderAvatar
                  username={initialProfileData.username}
                  avatarUrl={avatarUrl}
                  size='sm'
                  badge={
                    <AvatarBadge bg='papayawhip' color='black' boxSize='1em' borderRadius='0'>
                      <EditIcon h={4} w={4} />
                    </AvatarBadge>
                  }
                />
              </Box>
            </Flex>
          )}
        </Flex>
        <form onSubmit={handleSubmit}>
          <Flex flexDirection='column' gap='4'>
            {isEditingBio || !bio ? (
              <FormControl isInvalid={!!err}>
                <Textarea
                  name='bio'
                  id='bio'
                  value={bio}
                  maxLength={140}
                  isInvalid={!!err}
                  onChange={handleBioChange}
                  rows={Math.floor(bio.length / 40) + 1}
                />
                {!profile.bio && (
                  <FormHelperText>Let others know a little more about @{profile.username}</FormHelperText>
                )}
                <FormErrorMessage>{err}</FormErrorMessage>
              </FormControl>
            ) : (
              <Text fontSize='md' as='h2'>
                {bio}
              </Text>
            )}
            <Button
              leftIcon={isEditingBio ? <></> : <EditIcon />}
              colorScheme='twitter'
              variant='solid'
              onClick={handleSubmit}
              type={isEditingBio ? 'submit' : 'button'}
              isLoading={isSubmitting}
            >
              {isEditingBio ? 'Submit' : 'Update'}
            </Button>
          </Flex>
        </form>
      </Flex>
    </Box>
  );
};
