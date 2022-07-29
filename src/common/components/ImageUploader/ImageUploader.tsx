import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  Box,
  Center,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react';
import Image from 'next/image';
import { Dropzone } from './Dropzone';
import { useImageUploader } from './useImageUploader';
export const ImageUploader = () => {
  const { onClose, isOpen } = useDisclosure();
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    clearPreviewOnLoad,
    preview,
    error,
    file,
    dimensions,
    aspectRatio,
    clearFile,
    scaleImage,
  } = useImageUploader();

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {file && dimensions && aspectRatio ? (
          <Flex alignItems={'center'} justifyContent='center' flexDir='column'>
            <Center p={10}>
              <Image
                src={preview}
                onLoad={clearPreviewOnLoad}
                width={scaleImage(dimensions, 400, 400).width}
                height={scaleImage(dimensions, 400, 400).height}
                onLoadingComplete={clearPreviewOnLoad}
              />
            </Center>
            <Button onClick={clearFile}>Replace Image</Button>
          </Flex>
        ) : (
          <Dropzone
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
          />
        )}
        {error && (
          <Box p={2}>
            <Text fontSize='sm' color='red.500'>
              {error.message}
            </Text>
          </Box>
        )}
      </ModalContent>
    </Modal>
  );
};
