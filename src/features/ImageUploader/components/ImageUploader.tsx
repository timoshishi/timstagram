import { useImageUploader } from '../hooks/useImageUploader';
import { Dropzone } from './Dropzone';
import { Cropper } from './Cropper';
import { Box, Center, Spinner, Flex } from '@chakra-ui/react';
import { BrandLogo } from '@common/components/BrandLogo';

export const ImageUploader = () => {
  const { preview, isUploaderLoading } = useImageUploader();
  if (isUploaderLoading) {
    return (
      <Flex h='60vh' w='100%' flexDir='column'>
        <Flex align='center' justify='center' p='2rem'>
          <BrandLogo />
        </Flex>
        <Center flexGrow='1' mb='4rem'>
          <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
        </Center>
      </Flex>
    );
  }
  return <>{preview ? <Cropper /> : <Dropzone />}</>;
};
