import { ModalContent, ModalOverlay, useDisclosure, Box, Button } from '@chakra-ui/react';
import { useProfileModal } from '../hooks/useProfileModal';
import { ProfileModalForm } from './ProfileModalForm';
import { ImageUploader } from '@features/ImageUploader';
import { useImageUploader } from '@features/ImageUploader';
import { useCallback, useEffect } from 'react';
import { handleAvatarSubmit } from '../api/profile-api';
import { useUser } from '@common/hooks/useUser';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export interface ProfileModalProps {}

export const ProfileModalBase = () => {
  const { user } = useUser();
  const { useModalToast, hideModal } = useProfileModal();
  if (!user) hideModal();

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
  if (!user) return null;
  return (
    <>
      <ModalOverlay />
      <ModalContent p={6}>
        <ProfileModalForm
          userMeta={user.user_metadata}
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
