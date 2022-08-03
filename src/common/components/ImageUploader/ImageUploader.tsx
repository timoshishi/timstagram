import { ModalContent, Box, ModalOverlay, Modal } from '@chakra-ui/react';
import { useImageUploaderContext } from './ImageUploaderContext';
import { Dropzone } from './Dropzone';
import { Cropper } from './Cropper';
import { ErrorMessage } from '../ErrorMessage';
import { handleCroppedImage } from './imageUploader.functions';
import { noOp } from '@common/utils';

export const ImageUploader = () => {
  const { error, preview } = useImageUploaderContext();
  return (
    <Modal
      isOpen={true}
      onClose={noOp}
      size={['md', 'lg', '3xl']}
      initialFocusRef={undefined}
      isCentered={true}>
      <ModalOverlay />
      <ModalContent p='0' display={'flex'} flexDir='column'>
        {preview ? (
          <Cropper handleCroppedImage={handleCroppedImage} />
        ) : (
          <Dropzone />
        )}
        <ErrorMessage errorMessage={error?.message} />
      </ModalContent>
    </Modal>
  );
};
