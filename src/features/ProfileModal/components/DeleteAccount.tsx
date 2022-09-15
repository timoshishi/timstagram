import { Button, FormControl, FormHelperText, Flex, useBoolean, Collapse, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { deleteUser } from '../api/profile-api';
import { useProfileModal } from '../hooks/useProfileModal';

export const DeleteAccount = () => {
  const [isDeletingUser, { toggle: toggleIsDeletingUser }] = useBoolean();
  const [permDeleteText, setPermDeleteText] = useState('');
  const [isLoading, { toggle: toggleIsLoading }] = useBoolean();
  const { hideModal, useModalToast } = useProfileModal();

  const deleteIsValid = permDeleteText === 'permanently delete';

  const handleToggle = () => {
    toggleIsDeletingUser();
    setPermDeleteText('');
  };

  const handleDelete = async () => {
    toggleIsLoading();
    try {
      await deleteUser();
      hideModal();
      useModalToast.info({
        title: "We're sorry to see you go",
        message: 'Account deleted successfully',
      });
    } catch (error) {
      useModalToast.error({
        message: 'Error deleting account',
        error,
      });
    }
    toggleIsLoading();
  };

  return (
    <>
      <Collapse in={isDeletingUser} animateOpacity>
        <FormControl>
          <Input
            type='text'
            value={permDeleteText}
            onChange={(e) => setPermDeleteText(e.target.value)}
            placeholder='Type "permanently delete" to confirm'
          />
          {deleteIsValid && <FormHelperText color='red.500'>This is permanent, are you sure?</FormHelperText>}
        </FormControl>
      </Collapse>
      <Flex justifyContent='space-between'>
        {isDeletingUser && (
          <Button
            size='sm'
            variant='solid'
            bg='red.500'
            color='white'
            disabled={!deleteIsValid}
            onClick={handleDelete}
            isLoading={isLoading}
          >
            Delete Account
          </Button>
        )}
        <Button size='sm' variant='ghost' color='red.500' onClick={handleToggle}>
          {isDeletingUser ? 'Cancel' : 'Delete Account'}
        </Button>
      </Flex>
    </>
  );
};
