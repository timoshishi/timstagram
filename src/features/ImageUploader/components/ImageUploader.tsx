import { ModalContent, Box, ModalOverlay, Modal, Portal } from '@chakra-ui/react';
import { useRef } from 'react';
import { useImageUploaderContext } from '../hooks/useImageUploaderContext';
import { Dropzone } from './Dropzone';
import { Cropper } from './Cropper';
import { ErrorMessage } from '../../../common/components/ErrorMessage';
import { handleCroppedImage } from '../utils/image-uploader-functions';
import { noOp } from '@common/utils';

export const ImageUploader = () => {
  const { error, preview } = useImageUploaderContext();
  // const uploaderRef = useRef<HTMLDivElement | null>(null);
  return (
    <Portal>
      <Modal isOpen={true} onClose={noOp} size={['md', 'lg', '3xl']} initialFocusRef={undefined} isCentered={true}>
        <ModalOverlay />
        <ModalContent p='0' display={'flex'} flexDir='column'>
          {preview ? <Cropper handleCroppedImage={handleCroppedImage} /> : <Dropzone />}
          <ErrorMessage errorMessage={error?.message} />
        </ModalContent>
      </Modal>
    </Portal>
  );
};