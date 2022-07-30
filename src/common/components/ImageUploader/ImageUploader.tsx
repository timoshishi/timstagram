import { ModalContent, ModalCloseButton, Box } from '@chakra-ui/react';
import { Dropzone } from './Dropzone';
import { useImageUploader } from './useImageUploader';
import { Cropper } from './Cropper';
import { ErrorMessage } from '../ErrorMessage';
import { handleCroppedImage } from './imageUploader.functions';

export const ImageUploader = () => {
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
      <ModalCloseButton />
      {preview ? (
        <>
          <Cropper
            previewUrl={preview}
            handleCroppedImage={handleCroppedImage}
            clearFile={clearFile}
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
