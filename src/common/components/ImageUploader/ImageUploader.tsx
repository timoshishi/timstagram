import {
  ModalContent,
  ModalCloseButton,
  Box,
  ModalHeader,
  Center,
  Flex,
} from '@chakra-ui/react';
import { Dropzone } from './Dropzone';
import { useImageUploader } from './useImageUploader';
import { Cropper } from './Cropper';
import { ErrorMessage } from '../ErrorMessage';
import { handleCroppedImage } from './imageUploader.functions';

interface ImageUploaderProps {
  cropShape?: 'round' | 'rect';
  title?: string;
}

export const ImageUploader = ({
  cropShape = 'rect',
  title = 'Upload your image',
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

  return (
    <ModalContent>
      <Flex justifyContent={'center'} w='%100'>
        <Box w='fit-content' maxW='500px'>
          <ModalHeader w='100%'>{title}</ModalHeader>
        </Box>
      </Flex>
      <ModalCloseButton />
      {preview ? (
        <>
          <Cropper
            previewUrl={preview}
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
  );
};
