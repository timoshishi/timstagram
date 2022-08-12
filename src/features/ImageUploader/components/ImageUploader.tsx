import { ModalContent, ModalOverlay, Modal, Portal } from '@chakra-ui/react';
import { useImageUploaderContext } from '../hooks/useImageUploaderContext';
import { Dropzone } from './Dropzone';
import { Cropper } from './Cropper';
import { noOp } from '@common/utils';

export const ImageUploader = () => {
  const { error, preview } = useImageUploaderContext();

  return (
    <Portal>
      <Modal isOpen={true} onClose={noOp} size={['md', 'lg', '3xl']} initialFocusRef={undefined} isCentered={true}>
        <ModalOverlay />
        <ModalContent p='0' display={'flex'} flexDir='column'>
          {preview ? <Cropper /> : <Dropzone />}
        </ModalContent>
      </Modal>
    </Portal>
  );
};
