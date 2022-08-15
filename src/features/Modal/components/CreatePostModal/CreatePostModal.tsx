import { ImageUploader, ImageUploaderProvider } from '@features/ImageUploader';
import { ModalOverlay, ModalContent, Box, Textarea, Flex, Button } from '@chakra-ui/react';
import { useCreatePostModal } from '@features/Modal/hooks';
import { PostForm } from '@features/ImageUploader/components/Cropper/PostForm';
import { HandleSubmitPost } from '@features/Modal/hooks/useCreatePostModal';
import { useEffect } from 'react';

export interface CreatePostModalProps {
  handleSubmit: HandleSubmitPost;
}

export const CreatePostModal = () => {
  return (
    <ImageUploaderProvider>
      <ModalOverlay />
      <ModalContent p='0' display={'flex'} flexDir='column'>
        <PostForm />
        <ImageUploader />
      </ModalContent>
    </ImageUploaderProvider>
  );
};
