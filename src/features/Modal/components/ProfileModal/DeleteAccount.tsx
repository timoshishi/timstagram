import { Button, FormControl, FormHelperText, Flex, useBoolean, Collapse, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { deleteUser } from '@features/Modal/api/profile-api';
import { useProfileModal } from '@features/Modal/hooks';

export const DeleteAccount = () => {
  const [isDeletingUser, { toggle: toggleIsDeletingUser }] = useBoolean();
  const [permDeleteText, setPermDeleteText] = useState('');
  const [isLoading, { toggle: toggleIsLoading }] = useBoolean();
  const { hideModal } = useProfileModal();

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
    } catch (error) {
      console.error(error);
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
