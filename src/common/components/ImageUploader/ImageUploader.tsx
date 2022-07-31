import {
  ModalContent,
  ModalCloseButton,
  Box,
  ModalOverlay,
  Modal,
} from '@chakra-ui/react';
import { Dropzone } from './Dropzone';
import { useImageUploader } from './useImageUploader';
import { Cropper } from './Cropper';
import { ErrorMessage } from '../ErrorMessage';
import { handleCroppedImage } from './imageUploader.functions';
import { noOp } from '@common/utils';

interface ImageUploaderProps {
  cropShape?: 'round' | 'rect';
  title?: string;
  testImg?: string;
}

export const ImageUploader = ({
  cropShape = 'rect',
  title = 'Upload your image',
  testImg,
}: ImageUploaderProps) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    preview,
    error,
    file,
    dimensions,
    aspectRatio,
    clearFile,
  } = useImageUploader();
  const imgUrl = testImg ?? preview;
  return (
    <Modal isOpen={true} onClose={noOp} size={['full', 'full', '2xl']}>
      <ModalOverlay />
      <ModalContent p='0' bg='teal' display={'flex'} flexDir='column'>
        <ModalCloseButton
          fill='white'
          zIndex={10000}
          color='white'
          onClick={clearFile}
        />
        {imgUrl ? (
          <>
            <Cropper
              previewUrl={imgUrl}
              handleCroppedImage={handleCroppedImage}
              clearFile={clearFile}
              cropShape={cropShape}
            />
          </>
        ) : (
          <Box>
            <Dropzone
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
            />
          </Box>
        )}
        <ErrorMessage errorMessage={error?.message} />
      </ModalContent>
    </Modal>
  );
};
