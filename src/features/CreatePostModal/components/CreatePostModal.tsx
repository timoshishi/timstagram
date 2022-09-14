import { ImageUploader, ImageUploaderProvider } from '@features/ImageUploader';
import { ModalOverlay, ModalContent } from '@chakra-ui/react';
import { PostForm } from './PostForm';

export const CreatePostModal = () => {
  return (
    <ImageUploaderProvider hasAdditionalStep={true}>
      <ModalOverlay />
      <ModalContent p='0' display={'flex'} flexDir='column'>
        <PostForm />
        <ImageUploader />
      </ModalContent>
    </ImageUploaderProvider>
  );
};
