import { ImageUploader, ImageUploaderProvider, useCreateUploaderContext } from '@features/ImageUploader';
import { ModalOverlay, ModalContent } from '@chakra-ui/react';
import { useCreatePostModal } from '../hooks/useCreatePostModal';

export interface CreatePostModalProps {}

export const CreatePostModal = () => {
  const initialValue = useCreateUploaderContext();
  return (
    <ImageUploaderProvider initialValue={initialValue}>
      <>
        <ModalOverlay />
        <ModalContent p='0' display={'flex'} flexDir='column'>
          <ImageUploader />
        </ModalContent>
      </>
    </ImageUploaderProvider>
  );
};
