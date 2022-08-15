import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { ModalContent, ModalOverlay, Text, useDisclosure, Box, Button } from '@chakra-ui/react';
import { useProfileModal } from '../../hooks/useProfileModal';
import { ProfileModalForm } from './ProfileModalForm';
import { SupaUser } from 'types/index';
import { ImageUploader } from '@features/ImageUploader';

export interface ProfileModalProps {
  initialProfileData: SupaUser['user_metadata'];
}

export const ProfileModal = () => {
  const {
    componentProps: { initialProfileData },
  } = useProfileModal();
  const {
    isOpen: isFormStepOpen,
    onClose,
    onToggle,
    getDisclosureProps,
    getButtonProps,
  } = useDisclosure({
    defaultIsOpen: true,
  });
  const profile: SupaUser['user_metadata'] = Object.assign(
    {
      username: '',
      bio: '',
      avatarUrl: '',
    },
    initialProfileData
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullFormData = new FormData(e.target as HTMLFormElement);

    const dataParsed = Object.fromEntries(fullFormData.entries());
    e.preventDefault();
  };
  const deleteUser = async () => {
    // const { data, error } = await supabaseClient.from('profiles').delete().match({ userId: initialProfileData.userId });
    // const { data: data2, error: error2 } = await supabaseClient
    //   .from('auth.users')
    //   .delete()
    //   .match({ id: initialProfileData.userId });
  };
  console.log(isFormStepOpen);
  return (
    <>
      <ModalOverlay />
      <ModalContent p={6}>
        <ProfileModalForm
          profile={profile}
          initialProfileData={initialProfileData}
          handleSubmit={handleSubmit}
          deleteUser={deleteUser}
          getButtonProps={getButtonProps}
          getDisclosureProps={getDisclosureProps}
        />
        {!isFormStepOpen && (
          <>
            <Button {...getButtonProps()} onClick={onToggle} h='40px' w='40px'>
              Back
            </Button>

            <Box>
              <ImageUploader />
            </Box>
          </>
        )}
      </ModalContent>
    </>
  );
};
