import { ModalContent, ModalOverlay, useDisclosure, Box, Button } from '@chakra-ui/react';
import { useProfileModal } from '../../hooks/useProfileModal';
import { ProfileModalForm } from './ProfileModalForm';
import { SupaUser } from 'types/index';
import { ImageUploader } from '@features/ImageUploader';
import { useImageUploaderContext } from '@features/ImageUploader';
import { useCallback, useEffect } from 'react';
import { handleAvatarSubmit } from '@features/Modal/api/profile-api';

export interface ProfileModalProps {
  initialProfileData: SupaUser['user_metadata'];
}

export const ProfileModal = () => {
  const {
    componentProps: { initialProfileData },
  } = useProfileModal();
  const {
    isOpen: isFormStepOpen,
    onToggle,
    getDisclosureProps,
    getButtonProps,
  } = useDisclosure({
    defaultIsOpen: true,
  });

  const { croppedImage, clearFile, toggleUploaderLoading } = useImageUploaderContext();
  const onAvatarSubmit = useCallback(async () => {
    toggleUploaderLoading();
    try {
      if (croppedImage && !isFormStepOpen) {
        await handleAvatarSubmit(croppedImage);
        clearFile();
        onToggle();
      }
    } catch (error) {
      console.error(error);
    }
    toggleUploaderLoading();
  }, [croppedImage]);
  useEffect(() => {
    onAvatarSubmit();
  }, [croppedImage]);

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
  };
  const deleteUser = async () => {};

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
