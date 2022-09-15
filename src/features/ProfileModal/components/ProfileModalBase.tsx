import { ModalContent, ModalOverlay, useDisclosure, Box, Button } from '@chakra-ui/react';
import { useProfileModal } from '../hooks/useProfileModal';
import { ProfileModalForm } from './ProfileModalForm';
import { SupaUser } from 'types/index';
import { ImageUploader } from '@features/ImageUploader';
import { useImageUploader } from '@features/ImageUploader';
import { useCallback, useEffect } from 'react';
import { handleAvatarSubmit } from '../api/profile-api';
import { useUser } from '@common/hooks/useUser';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export interface ProfileModalProps {
  initialProfileData: SupaUser['user_metadata'];
}

export const ProfileModalBase = () => {
  const { user } = useUser();
  const {
    componentProps: { initialProfileData },
    useModalToast,
  } = useProfileModal();
  const {
    isOpen: isFormStepOpen,
    onToggle,
    getDisclosureProps,
    getButtonProps,
  } = useDisclosure({
    defaultIsOpen: true,
  });

  const { croppedImage, clearFile, toggleUploaderLoading } = useImageUploader();

  const onAvatarSubmit = useCallback(async () => {
    toggleUploaderLoading();
    try {
      if (croppedImage && !isFormStepOpen) {
        await handleAvatarSubmit(croppedImage);
        clearFile();
        onToggle();
        useModalToast.success({
          message: 'Avatar updated successfully',
        });
      }
    } catch (error) {
      useModalToast.error({
        error,
        message: 'Error updating avatar',
      });
    }
    toggleUploaderLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedImage]);

  useEffect(() => {
    onAvatarSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedImage]);

  const profile: SupaUser['user_metadata'] = Object.assign(
    {
      username: '',
      bio: '',
      avatarUrl: '',
    },
    initialProfileData
  );

  return (
    <>
      <ModalOverlay />
      <ModalContent p={6}>
        <ProfileModalForm
          profile={profile}
          initialProfileData={initialProfileData}
          avatarUrl={user?.user_metadata?.avatarUrl || ''}
          getButtonProps={getButtonProps}
          getDisclosureProps={getDisclosureProps}
        />
        {!isFormStepOpen && (
          <>
            <Button
              {...getButtonProps()}
              onClick={onToggle}
              h='10px'
              w='40px'
              variant='flushed'
              leftIcon={<ChevronLeftIcon />}
            >
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
