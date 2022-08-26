import { useImageUploader } from '../hooks/useImageUploader';
import { Dropzone } from './Dropzone';
import { Cropper } from './Cropper';
import { Box, Center, Spinner, Flex } from '@chakra-ui/react';

export const ImageUploader = () => {
  const { preview, isUploaderLoading } = useImageUploader();
  if (isUploaderLoading) {
    return (
      <Box h='60' w='100%'>
        <Flex alignItems='center' justifyContent='center' h='100%' w='100%'>
          <Center>
            <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
          </Center>
        </Flex>
      </Box>
    );
  }
  return <>{preview ? <Cropper /> : <Dropzone />}</>;
};
