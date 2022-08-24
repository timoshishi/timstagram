import {
  Button,
  FormControl,
  FormHelperText,
  Textarea,
  Text,
  Flex,
  FormErrorMessage,
  useBoolean,
} from '@chakra-ui/react';
import { updateProfile } from '@features/Modal/api/profile-api';
import React, { FormEventHandler, useState } from 'react';
import { EditIcon } from '@chakra-ui/icons';
import { SupaUser } from 'types/index';
import { useProfileModal } from '@features/Modal/hooks';

interface EditBioProps {
  profile: Required<SupaUser['user_metadata']>;
}
export const EditBio = ({ profile }: EditBioProps) => {
  const [bio, setBio] = useState(profile.bio);
  const [err, setErr] = useState('');
  const [isEditingBio, { toggle: toggleEditingBio }] = useBoolean(!profile.bio);
  const [isSubmitting, { toggle: toggleIsSubmitting }] = useBoolean();
  const { useModalToast } = useProfileModal();

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isEditingBio && bio) {
      toggleEditingBio();
    }
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
      toggleIsSubmitting();
      await updateProfile({
        bio,
      });
      toggleEditingBio();
      useModalToast.success({
        message: 'Bio updated successfully',
      });
    } catch (error) {
      useModalToast.error({
        error: error,
        message: 'Error updating bio',
      });
    }
    toggleIsSubmitting();
  };

  return (
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
            {!profile.bio && <FormHelperText>Let others know a little more about @{profile.username}</FormHelperText>}
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
          {isEditingBio ? 'Submit' : 'Update Bio'}
        </Button>
      </Flex>
    </form>
  );
};
