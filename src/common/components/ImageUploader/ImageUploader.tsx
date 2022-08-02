import {
  ModalContent,
  ModalCloseButton,
  Box,
  ModalOverlay,
  Modal,
  useModal,
  UseModalReturn,
  useDimensions,
} from '@chakra-ui/react';
import {
  ImageUploaderProvider,
  useImageUploaderContext,
} from './ImageUploaderContext';
import { Dropzone } from './Dropzone';
import { useImageUploader } from './useImageUploader';
import { Cropper } from './Cropper';
import { ErrorMessage } from '../ErrorMessage';
import { handleCroppedImage } from './imageUploader.functions';
import { noOp } from '@common/utils';
import { useRef } from 'react';

export const ImageUploader = () => {
  const { error, preview } = useImageUploaderContext();
  return (
    <Modal isOpen={true} onClose={noOp} size={['lg', 'md', 'lg']}>
      <ModalOverlay />
      <ModalContent p='0' display={'flex'} flexDir='column'>
        {preview ? (
          <Cropper handleCroppedImage={handleCroppedImage} />
        ) : (
          <Box>
            <Dropzone />
          </Box>
        )}
        <ErrorMessage errorMessage={error?.message} />
      </ModalContent>
    </Modal>
  );
};
